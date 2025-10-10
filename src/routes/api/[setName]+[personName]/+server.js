/** @type {import('./$types').RequestHandler} */

/*
I need to have a GET and a POST here. 

GET
Input: user's email and requested sticky set
Side Effects: if the set doesn't exist, create a new set.
Return: the requested sticky set object.

POST
INPUT: the sticky set object
Side Effects: if they're not allowed to access that, reject it. If they are, save it. 
Return: success or fail
*/


//imports
import {json} from '@sveltejs/kit';
//redis

//define the sticky set class
class StickySet {
    constructor(setName, whoDoesThisBelongTo){
        this.name = setName;
        this.whoDoesThisBelongTo = whoDoesThisBelongTo;
        this.whoElseCanAccess = [];
        this.notes = [{x: 0, y: 0, text: "I'm an example Sticky. Change me, delete me. :D"}, {x: 100, y: 100, text: "Moar!"}];
    }
}



export async function GET() {
    console.log("someone requested a sticky set from the BE");
    //get the params for setName and personName
    //query redis to see if it's there. 
    //Not there? Make a blank into redis and send it back.
    //there? grab it and send it back. 


    //return new mostly empty sticky set for now. 
    return json(new StickySet("development", "tonydiethelm@gmail.com"));
};