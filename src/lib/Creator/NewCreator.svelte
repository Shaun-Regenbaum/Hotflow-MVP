<script>
import { update_keyed_each } from "svelte/internal";

</script>
<div id="new_creator">
    <h3>Welcome to Hotflow Creators</h3>
    <div id="description"><p>Gain new streams of revenue by monetizing anything with a link through Hotflow. </p></div>
    
    <button><h3>Become a Creator</h3><div id="raised"><p >No sign up required</p></div></button>
</div>

<style>
    #new_creator {
        /* Keeping the Login Form Centered: */
        text-align: center;

        /*Padding: */
        padding: 1rem;

        /* Neuromorphism */
        border-radius: 25px;
        box-shadow: inset 3px 3px 5px #eeeeee,
            inset -3px -3px 5px #bebebe;
	}

    #description{
        min-width:200px;
        width:70%;
        margin: auto;
        justify-content: center;
    }

    #raised{
        padding: 0.1rem;
        border-radius: 10px;
        box-shadow: inset 2px 2px 1px #bebebe,
            inset -2px -2px 1px #eeeeee;
    }

	button {
		/* Removing all the default outlines: */
		border: 0;
  		outline:0;
		background: #e0e0e0;
		padding: 0.2rem 0.5rem 0.2rem 0.5rem;
		margin-top: 0.5rem;
		color:rgba(65, 65, 65, 0.719);
		border-radius: 10px;
		box-shadow: 3px 3px 10px #bebebe,
             -3px -3px 10px #ffffff;
	}
</style>