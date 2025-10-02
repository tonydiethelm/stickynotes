<script>
    //stickies are loaded from the 
    let { data, form } = $props();

    //imports
	import Sticky from "../lib/sticky.svelte";

    //I'll need identifiers for the sticky set, to pass to form functions. 
    //form.setName and form.whoDoesThisBelongTo



    //functions
    function placeholderFunction(){
        console.log('the button clicked.');
        //alert('the button clicked.');
    }

</script>



<!--
I need an input and a Get It button for fetching sticky sets. This will need to send the whoDoesThisBelongTo and setName.
I need a + button to create a new sticky on a given set. This will need to send the whoDoesThisBelongTo and setName.
I need a log in button that will do OAuth to google to get them an identity to save sticky sets under. 
-->


<!--
If there's data, but no form data, display a little howto?-->

<!--
If there's form data, display a sticky for each note in the form data.
-->


<style>
/*
I need to style the Get It UI to be top of the page, centered, and always on top. 
I need to put the log in button on top right. 
I need to put the + button.... Where? 
*/
</style>