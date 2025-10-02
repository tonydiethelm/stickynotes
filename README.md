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

### main app

### Sticky Notes format

The sticky notes are saved as an array. 

`[x postion, y position, text]`

A set of sticky notes is saved as an object, where the key is the name of the sticky note set and the person it belongs to.

`{whoDoesThisBelongTo: 'person name', SetName: 'stuff to do', notes: [first note, second note, etc]}`

Am I sure I want to do this? It's much easier to delete items out of an object than an array, especially if I pass down an identifier.

### Backend

The back end needs to:

* connect to the reddis DB
* provide an API that...
    * GET the sticky collection
    * POST to create a new sticky note in a given collection. (and create a new collection if needed)
