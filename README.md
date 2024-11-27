# Welcome to Sticky Notes

This is a small application to create sticky notes. 
I use sticky notes to order my life with tasks, prioritization based on position, etc.
I wanted to replicate that. 

## How To Use

* There's a text field in the center top of the screen. Write in a name for a collection of sticky notes (IE: "stuff to do"). 
    * If the collection of sticky notes exists, it'll pull up your sticky notes. 
    * If the collection of sticky notes doesn't exist, it'll be created. 
* There's a + button in the upper right. Hit it and a new sticky note will be created.
* click on a sticky note to change the text.
* select a sticky note, or multiple sticky notes, and hit 'Delete' to delete a sticky note.
* click and drag a sticky note to move it. 

## Development

### running the dev code

This is built using [svelte](https://svelte.dev/). 

* You'll need a working [reddis](https://redis.io/) DB on your computer. It'll need to be working on the Reddis default port of 6379. 
* `npm run dev` will bring the sticky notes app up on your computer. 
* `npm run build` will build the sticky notes app for deployment.
    * To Do: figure out the adapter needed. 

## Running this thing for real

* You'll need to figure out for yourself how you're going to run this, either as static HTML pages, or a Javascript app running in node.js. Or something else. 
* Again, you'll need a [reddis](https://redis.io/) DB accessible for the app to store sticky note sets in.


## Development Notes / Engineering Decisions

This section has notes on the decisions made during the devlopment of this thing. 

### main app

The main app uses svelte and is under /src/routes and is +page.svelte. 
The backend uses express and is under /backend. 

### Sticky Notes format

The sticky notes are saved as an array. 

`[x postion, y position, z position, text]`

A set of sticky notes is saved as an object, where the key is the name of the sticky note set.  

`{'stuff to do': [first note, second note, etc]}`

Am I sure I want to do this? It's much easier to delete items out of an object than an array, especially if I pass down an identifier. 

### Backend

The back end needs to:

* connect to the reddis DB
* provide an API that...
    * GET the sticky collection
    * POST to create a new sticky note in a given collection. (and create a new collection if needed)
    * DELETE to delete a sticky note in a given collection. (and delete a collection if it's empty)

It'll run on port 3000. 