<script>
    let { currentStickySet = $bindable(), ...props} = $props();

    //get left and top positions for the Sticky.
    let left = $derived(currentStickySet.notes[props.counter].x);
    let top = $derived(currentStickySet.notes[props.counter].y);
    //get deltas between cursor and left/top
    let leftDelta;
    let topDelta;
    let isTheStickyMoving = false;

    //need function to remove sticky from the set.
    //use props.counter to properly index.
    function removeSticky(){
        //console.log("X was pushed on sticky", props.counter);
        //we have the index from props.
        //splice this out of the currentStickySet
        //array.splice(index of element we want to remove, 1 element)
        currentStickySet.notes.splice(props.counter, 1)
        return {success: true};
    }

    //Toggle if sticky is being moved or not.
    function toggleIfStickyIsMoving () {
        isTheStickyMoving = !isTheStickyMoving;
    }

</script>



<!--
top bit to grab on to           X to close
Big input field

on mouse down, capture the difference between cursor position and x/y positions and set "moving" variable.
on mouse move IF MOVING IS SET, change left/right positions above. 
on mouse up, write new left/right positions to currentStickySet and set "moving" variable to false.
-->

<div 
    class="sticky" 
    style="position:absolute; top:{top}px; left:{left}px;"
    onmousedown={(event) => {
		leftDelta = event.clientX-left;
		topDelta = top-event.clientY;
	}}
    onmousemove={(event) => {
        left = event.clientX-leftDelta;
        top = event.clientY+topDelta
    }}
    onmouseup={(event) => {
        currentStickySet.notes[props.counter].x = left;
        currentStickySet.notes[props.counter].y = top;
    }}
    >
    <button onclick={removeSticky}>X</button>
    <textarea bind:value={currentStickySet.notes[props.counter].text}></textarea>
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
        padding: 1em;
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
</style>