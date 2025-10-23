<script>
    let { currentStickySet = $bindable(), ...props} = $props();

    //deltas between cursor and left/top
    let pointerToStickyLeftDelta;
    let pointerToStickyTopDelta;
    //tracks when the sticky SHOULD be moving.
    let isTheStickyMoving = false;


    /*
    POST the sticky set
    Input: the sticky set object
    Side Effects:  do a POST to the API
    return: nada
    Notes: fetch to /api/ set name + requestor name + owner name
    */
    async function saveTheStickySet(){
        console.log("saveTheStickySet fired off");
        const response = await fetch(`/api/${currentStickySet.setName}+NA+${currentStickySet.whoDoesThisBelongTo}`, 
            {
                method: "POST",
                body: JSON.stringify(currentStickySet),
					headers: {
						'Content-Type': 'application/json'
					}
            }
        )
        return await response.json();
    };




    //need function to remove sticky from the set.
    //use props.counter to properly index.
    async function removeSticky(){
        //console.log("X was pushed on sticky", props.counter);
        //splice this out of the currentStickySet - array.splice(index of element we want to remove, 1 element)
        currentStickySet.notes.splice(props.counter, 1)
        saveTheStickySet();
        return {success: true};
    }

    

    
    //on mouse down, grab the deltas betwen the pointer X,Y and the sticky X,Y, and toggle if sticky is moving. 
    function onpointerdown (event) {
        //console.log("pointer is down!");
        pointerToStickyLeftDelta = currentStickySet.notes[props.counter].x - event.clientX
        pointerToStickyTopDelta = currentStickySet.notes[props.counter].y - event.clientY 
        isTheStickyMoving = true;
    }

    //on pointer move, ONLY DO THIS IF isTheStickyMoving is true! 
    function onpointermove (event) {
        //console.log("pointer is moving over the sticky")
        if(isTheStickyMoving){
            //console.log("sticky is moving!");
            currentStickySet.notes[props.counter].x = event.clientX + pointerToStickyLeftDelta;
            currentStickySet.notes[props.counter].y = event.clientY + pointerToStickyTopDelta;
        }
    }

    //on pointer up, toggle if sticky is moving to false. 
    //add in saving to DB?
    function onpointerup () {
        //console.log("pointer is up!")
        isTheStickyMoving = false;
        //send the currentstickyset to db?
        saveTheStickySet();
    }

</script>



<!--
top bit to grab on to           X to close
Big input field

on mouse down, capture the difference between cursor position and x/y positions and set "moving" variable.
on mouse move IF MOVING IS SET, change left/right positions above. 
on mouse up, write new left/right positions to currentStickySet and set "moving" variable to false.
-->

<div class="sticky" style="position:absolute; top:{currentStickySet.notes[props.counter].y}px; left:{currentStickySet.notes[props.counter].x}px;">
    <div id="grabbable" {onpointerdown} {onpointermove} {onpointerup}></div>
    <button onclick={removeSticky}>X</button>
    <textarea bind:value={currentStickySet.notes[props.counter].text} onblur={saveTheStickySet}></textarea>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap');

    .sticky {
        background-color: #feff9c;
        color: black;
        font-family: 'Annie Use Your Telescope', serif;
        font-size: 2em;
        height: 6em;
        width: 6em;
        padding: .5em 1em 1em 1em;
        box-shadow: 0em 1em 1em gray;
    }


    .sticky:nth-child(even){
        transform: rotate(-2deg);
    }

    .sticky:nth-child(3n){
        transform: rotate(3deg);
    }

    button{
        position: absolute;
        right: 1em;
        background-color: #feff9c;
        outline: none;
        border: none;
    }

    textarea{
        background-color: #feff9c;
        color: black;
        font-family: 'Annie Use Your Telescope', serif;
        font-size: 1em;
        height: 80%;
        width: 100%;
        resize: none;
        border: none;
        outline: none;
    }

    #grabbable {
        height: 1em;
        width: 90%;
        display: inline-block; /*I want the X to sit next to this, inline.*/
    }
</style>