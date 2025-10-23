<script>
    //stickies are loaded from the 
    let { data } = $props();

    //imports
	import Sticky from "$lib/Sticky.svelte";

    //set up initial state.
    //this will get overwritten when they pull a sticky set.
    //using this as instructions
    let currentStickySet = $state({notes: [{x: 400, y: 400, text: "It auto saves whenever you change a sticky."},
            {x: 110, y: 375, text: "New Sticky is self explanatory."},
            {x: 700, y: 75, text: "put emails in the 'people allowed' to share your sticky set."},
            {x: 400, y: 125, text: "type a name and click 'get the sticky set'."},
            {x: 100, y: 100, text: "click the little shadow portrait to log in."},
        ]
    })
    $inspect("current sticky set is:", currentStickySet);


    //I need to keep track of the wantedSticky input and the PeopleAllowed input.
    let wantedStickyInput = $state('development');
    let peopleAllowedInput = $state('');

    //to toggle UI visibile/not
    let hidden = $state(true);

    function toggleVisible () {
        hidden = !hidden;
    }

    //functions

    /*
    Fetch the sticky set
    Input: user email and desired sticky set name
    Side Effects: do a GET to the API, stick the return data into currentStickySet/state.
    return: nada
    Notes: fetch to /api/ set name + requestor name + owner name
    */
    async function getTheStickySet(){
        const response = await fetch(`/api/${wantedStickyInput}+tonydiethelm@gmail.com+tonydiethelm@gmail.com`);
        currentStickySet = await response.json();
        return {success: true};
    }

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


    /*
    Create new sticky in the sticky set.
    Input: nothing
    Side Effects: add a sticky note to the currentStickySet
    return: nada
    */
    function createNewSticky(){
        //create a blank sticky. 
        const newSticky = {x: 100, y: 100, text: "new"};
        //add it onto the current sticky set.
        currentStickySet.notes.push(newSticky);
        return {success: true};
    }


</script>


<!--
I need an input and a Get It button for fetching sticky sets. This will need to send the whoDoesThisBelongTo and setName.
I need a + button to create a new sticky on a given set. This will need to send the whoDoesThisBelongTo and setName.
I need a log in button that will do OAuth to google to get them an identity to save sticky sets under. 
I need an input for emails that are allowed to see the set. 
I need instructions in the background of the center screen. 
-->



<div id="UI">
    <button 
        class={!hidden}
        onclick={toggleVisible}>Less UI</button>
    <br>
    <button
        class={hidden}
        onclick={toggleVisible}>More UI</button>
    <br>
    <input type='text' bind:value={wantedStickyInput} class={!hidden}>
    <button onclick={getTheStickySet} class={!hidden}>Get the sticky set</button>
    <br>
    <button onclick={createNewSticky}>New Sticky</button>
    <br>
    <div class={!hidden}>
        People Allowed:<input type='text' bind:value={peopleAllowedInput}>
    </div>
</div>


<!--
I need to use an EACH block to create the stickies in state on the page.
pass the counter down so it can accurately index. Not in state.
bind to current sticky set so each sticky can affect state/sticky set.
-->
{#each currentStickySet.notes, counter}
    <Sticky bind:currentStickySet={currentStickySet} counter={counter} 
    style="position:absolute; 
    left: {currentStickySet.notes[counter].x}px; 
    top: {currentStickySet.notes[counter].y}px;"
    />
{/each}




<style>
/*
I need to style the Get It UI to be top of the page, centered, and always on top. 
I need to put the log in button on top right. 
I need to put the + button.... Where? 
center the instructions div in the center of the screen.
*/
#UI{
    z-index: 10;
    position: absolute;
    right: 1em;
    top: 1em;
    border: solid lightseagreen .5em;
    border-radius: 1em;
    padding: 1em;
    font-family: 'Annie Use Your Telescope', serif;
    font-size: 1.5em;
}

input{
    font-family: 'Annie Use Your Telescope', serif;
    font-size: 1em;
}

button{
    font-family: 'Annie Use Your Telescope', serif;
    font-size: 1em;
}

.hidden {
    visibility: collapse;
}

</style>