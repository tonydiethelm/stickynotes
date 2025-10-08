<script>
    //stickies are loaded from the 
    let { data } = $props();

    //imports
	import Sticky from "../lib/sticky.svelte";

    //set up state.
    let currentStickySet = $state({})
    //I need to know what's aleady been posted for comparison so I don't send a set that isn't new. 
    let alreadyPostedStickySet;


    //I need to keep track of the wantedSticky input and the PeopleAllowed input.
    let wantedStickyInput = $state('development');
    let peopleAllowedInput = $state('');


    //functions

    /*
    Just a console log to make sure stuff is firing off. 
    */
    function placeholderFunction(){
        console.log('placeholder Function ran.');
    }

    /*
    Fetch the sticky set
    Input: user email and desired sticky set name
    Side Effects: do a GET to the API, stick the return data into currentStickySet/state.
    return: nada
    */
    function getTheStickySet(){
        console.log("getTheStickySet fired off. Get", wantedStickyInput);
    }

    /*
    POST the sticky set
    Input: the sticky set object
    Side Effects: put current sticky set object into AlreadyPostedStickySet, do a POST to the API
    return: nada
    */
    function postTheStickySet(){
        console.log("postTheStickySet fired off");

    }

    /*
    Post the sticky set if currentStickySet is different than AlreadyPostedStickySet
    Input: currentStickySet, AlreadyPostedStickySet
    Side Effects: 
    */
    function postIfNewSet() {
        console.log("do stuff if ", currentStickySet, "and", alreadyPostedStickySet, "are different.");
        if(currentStickySet != alreadyPostedStickySet){
            placeholderFunction()
        };
        return null;
    };
    /*
    Create new sticky in the sticky set.
    Input: nothing
    Side Effects: add a sticky note to the currentStickySet
    return: nada
    */
    function createNewSticky(){

    }


    /*
    Call a timer every X second to run postIfNewSet. set high in testing. 
    */
    //const intervalID = setInterval(postIfNewSet, 10000);


</script>


<!--
I need an input and a Get It button for fetching sticky sets. This will need to send the whoDoesThisBelongTo and setName.
I need a + button to create a new sticky on a given set. This will need to send the whoDoesThisBelongTo and setName.
I need a log in button that will do OAuth to google to get them an identity to save sticky sets under. 
I need an input for emails that are allowed to see the set. 
I need instructions in the background of the center screen. 
-->


<div id="instructions">
    <ul>
        <li>sign in by clicking the little face button on the upper right.</li>
        <li>type the name of your sticky notes set and hit "get my sticky notes" and your sticky notes will appear.</li>
        <li>hit the "add sticky" button to add a new sticky note.</li>
        <li>type in it, drag it whereever you want, no worries.</li>
        <li>you can type the emails of people you want to share this sticky note set with in the input field under the little face button.</li>
        <li>Everything auto saves every second, no worries.</li>

    </ul>
</div>

<div id="login">

</div>

<div id="getStickies">
    <input type='text' bind:value={wantedStickyInput}>
    <button onclick={getTheStickySet}>Get the sticky set</button>
</div>

<div id="New Sticky">
    <button onclick={createNewSticky}>New Sticky</button>
</div>



<style>
/*
I need to style the Get It UI to be top of the page, centered, and always on top. 
I need to put the log in button on top right. 
I need to put the + button.... Where? 
center the instructions div in the center of the screen.
*/

#instructions {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
}
</style>