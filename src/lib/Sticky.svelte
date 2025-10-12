<script>
    let { currentStickySet = $bindable(), ...props} = $props();
    console.log("what is current sticky set?", currentStickySet);


    //need function to remove sticky from the set.
    //use props.counter to properly index.
    function removeSticky(){
        //we have the index from props.
        //splice this out of the currentStickySet
        //array.splice(index of element we want to remove, 1 element)
        currentStickySet.notes.splice(props.counter, 1)
        return {success: true};
    }
</script>



<!--
top bit to grab on to           X to close
Big input field
-->
<div class="sticky">
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