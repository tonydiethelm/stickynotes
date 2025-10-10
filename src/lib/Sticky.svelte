<script>
    let { currentStickySet = $bindable(), ...props} = $props();
    console.log("what is current sticky set?", currentStickySet);
</script>

<!--
top bit to grab on to           X to close
Big input field
-->
Counter is: {props.counter}.


<input type="text" bind:value={currentStickySet.notes[props.counter].text}>




<style>
    
</style>