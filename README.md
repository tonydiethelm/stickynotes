# Welcome to Sticky Notes

This is a small application to create sticky notes. 
I use sticky notes to order my life with tasks, prioritization based on position, etc.
I wanted to replicate that. 

## How To Use

* There's a log in button in the upper right. Click and and log in with your gmail account. 
* There's a text field in the center top of the screen. Write in a name for a collection of sticky notes (IE: "stuff to do"). 
    * If the collection of sticky notes exists, it'll pull up your sticky notes. 
    * If the collection of sticky notes doesn't exist, it'll be created. 
* There's a + button in the upper right. Hit it and a new sticky note will be created.
* click on a sticky note to change the text.
* click the X in the upper right of a sticky note to delete it. 
* click and drag a sticky note to move it. 

## Development

### running the dev code

This is built using [svelte](https://svelte.dev/). 

* You'll need a working [reddis](https://redis.io/) DB on your computer. It'll need to be working on the Reddis default port of 6379. 
* `npm run dev` will bring the sticky notes app up on your computer. 


## Running this thing for real

* You'll need a [reddis](https://redis.io/) DB accessible for the app to store sticky note sets in.
* This is meant to be ran via docker. 
    * You'll need to build the image and upload to docker hub. 
    * You'll need to use docker-compose up -d in a directory with the compose.yaml file to start this up. 
* You'll probably need a reverse proxy to point to this. 


## Development Notes / Engineering Decisions

This section has notes on the decisions made during the devlopment of this thing. 


### Data Flow

<del>User asks for a sticky set, form data sent to BE.</del>
User asks for a sticky set, do a GET to an API route. 
It looks. Creates one if it's not there. 
<del>form data is returned, used to put stickies up?</del>

* Now my largest issue is how to set state from a load or a form return. 
* I'm overthinking things. Just use a GET to an API route... 
    * Per documentation.... https://svelte.dev/tutorial/kit/get-handlers

data from fetch overwrites state, state waterfalls down and creates stickies. 

user modifies stickies, here's the tricksy bit. 
* If we're sharing state, I can't reassign the whole thing. It would break the proxy link. 
* But I can change specific things. Do that. 
* I have the sticky identifier sent down, I can modify the shared state. Ok. Doable. No. Because I can't SET the shared state.
* I'm doing this the hard way. Use Bindable to have props communicate back to parent state. Ok! 

How to save the stickies for later? 

The easiest thing to do would be to just write the state every X seconds...
But that's unneeded data if it's not new. We can get around that too by comparing to last send. But then we have to record last send. Which also isn't terrible.

* I'm doing this for now. Get it working, that's all the user cares about. :D 


Best is to send it whenever it changes... Position change, text change, new sticky, delete sticky. 
There isn't a good way to do that via a form POST? Can the state be attached? Yeah, can attach to hidden state, JSONified. Ok.
But there isn't a good way to do a form POST on position change, on text change. 

So, let's just write functions for those and call a fetch to a BE API server. 

I really only need to send data to the BE when:

- finish typing in the input. Use onBlur event.
- move a sticky. Use pointerup event. 
- don't care about a new sticky until it has text in it. 
- add a person to the people allowed list. use OnBlur event. 
- 

### Sticky Notes format

The sticky notes are saved as an array. 

`{x: number, y: number, text: "some text"}`

A set of sticky notes is saved as an object, where the key is the name of the sticky note set and the person it belongs to.

`{whoDoesThisBelongTo: Person, whoElseCanAccess: [person1, person2, person3], setName: 'stuff to do', notes: [first note, second note, etc]}`

Am I sure I want to do this? It's much easier to delete items out of an object than an array, especially if I pass down an identifier. Nah, it'll leave holes. Untidy. 

The entire set of sticky notes (set) will be saved as an object in Redis, the main identifier for the set will be "Setname+whodoesThisBelongTo"

### Backend

The back end needs to:

* connect to the reddis DB
* provide an API that...
    * GET the requested sticky collection
    * POST to create a new sticky note in a given collection. (and create a new collection if needed)

### Problems

If two people are working on a sticky set at the same time, one person's changes WILL overwrite another person's changes, depending on when they last did a GET. 

* Crappy solution: Tell them to request before making changes. 
* Slightly less crappy solution: do GET on a timer.
* Better solution: Do this with websockets and stream the set continously to all users. 