<!--
See the README for important notes
-->


<script>
    //imports
	import Sticky from "../lib/sticky.svelte";


    //functions
    function placeholderFunction(){
        console.log('the button clicked.');
        //alert('the button clicked.');
    }
// function addSticky(){}

// function deleteSticky(){}

// function getStickySet(){}



</script>



<div id='ui'>
    <textarea placeholder='input the name of your sticky note board here' rows=1 cols='50'></textarea>
    <button onclick={placeholderFunction}>+</button>
</div>

<!--
Need to pull the sticky notes collection and create a sticky note HTML element for
each sticky note entry in the sticky note collection. 

Pass in XY coordinates, text, etc. 
-->

<Sticky />
<Sticky />
<Sticky />
<Sticky />


<style>
    #ui{
        width: 30%;
        margin: auto;
        }
    .outline{
        outline: 5px dotted blue;
    }
    button{
        font-size: x-large;
    }
</style>