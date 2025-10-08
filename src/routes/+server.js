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


export async function GET() {
    return new Response();
};