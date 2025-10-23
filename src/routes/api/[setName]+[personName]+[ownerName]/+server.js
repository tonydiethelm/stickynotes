/** @type {import('./$types').RequestHandler} */

/*
I need to have a GET and a POST here. 

GET
Input: user's email, requested sticky set, who owns the set.
Side Effects: if the set doesn't exist, create a new set. 
Return: the requested sticky set object

POST
INPUT: the sticky set object
Side Effects: if they're not allowed to access that, reject it. If they are, save it. 
Return: success or fail
*/

/*
I'm using Redis as the DB here. That needs to be installed on your machine! Or point it to a machine. 
I'm using an .env file, will come from compose.yaml file when running production. 
*/

//imports
import {json} from '@sveltejs/kit';
import { createClient } from 'redis';
import { redisDBLocation } from '$env/static/private';

//redis
const redisClient = await createClient({url: `redis://${redisDBLocation}:6379`})
    .on("error", (error) => console.log("Redis client error!!!", error))
    .connect();


//define the sticky set class
class StickySet {
    constructor(setName, whoDoesThisBelongTo){
        this.name = setName;
        this.whoDoesThisBelongTo = whoDoesThisBelongTo;
        this.whoElseCanAccess = [];
        this.notes = [{x: 100, y: 200, text: "I'm an example Sticky. Change me, delete me. :D"}];
    }
}


/*
Here's the GET. 
*/
export async function GET({ params }) {
    //get the params for setName and personName and ownerName
    //params.setName;           Name of the set
    //params.personName         Who is requesting it
    //params.ownerName          Who owns it

    //query redis to see if it's there. 
    const responseFromRedisGet = await redisClient.get(`${params.setName}+${params.ownerName}`)
    const responseFromREdisGetDeJSONed =  JSON.parse(responseFromRedisGet)

    //Not there AND yours? Make a blank into redis and send it back.
    if(responseFromRedisGet === null && params.ownerName === params.personName){
        const key = `${params.setName}+${params.ownerName}`;
        const newSet = new StickySet(params.setName, params.ownerName);
        const newSetJson = JSON.stringify(newSet);
        const responseFromRedisSet = await redisClient.set(key, newSetJson);
        //if OK, return. 
        return json(responseFromREdisGetDeJSONed,{status: 201});
    }
    //Not there AND not yours? Do nothing, return nothing. 

    //there? if it's someone else's, check if you're allowed to get it, and return it. 
    if(params.ownerName != params.personName){
        //dejsonify and check the peopleAllowed. Return if you're allowed to get it.
        //TODO, all this. 
    }

    //there? Yours? Send it back. 
    if(params.ownerName === params.personName){
        return json(responseFromREdisGetDeJSONed, {status: 201});
    }
};



export async function POST({ request }) {
    console.log("someone POSTed a sticky set to the BE");

    //We don't need to check if they own it. We did that when we got it. Just write it. 
    
    //get the set from the request body. 
    const sentSet = await request.json()
    console.log("sent set is:", sentSet, typeof(sentSet));

    //write to redisDB.
    const key = `${sentSet.name}+${sentSet.whoDoesThisBelongTo}`;
    const responseFromRedisSet = await redisClient.set(key, JSON.stringify(sentSet))
    console.log("response from redis Set is:", responseFromRedisSet)

    //if that's good, return success. 
    //TODO, check if that worked.
    return json({status: 201});

};