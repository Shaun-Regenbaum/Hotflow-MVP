<!-- @component
	PROPERTIES:

		1) price -> The price to associate the paypal buttons for.
	DESCRIPTION:

	This components contains the most basic information about a user.
 -->
<script lang="ts">
	import type { PayPalNamespace } from '@paypal/paypal-js';
	import { loadScript } from '@paypal/paypal-js';
	import { onMount } from 'svelte';
	import supabase from '$lib/db'

	export let price = 0;
	let value = String(price / 100);
	console.log(value);

	const CLIENT_ID =
		'AWTs40Ro2u2dmymDna1F_2TZzAMo3uWik_Gh1-fL1tR1E6AC6HGiGYNlKJFzIwXTuYcb50Cy3ZfsqUCm';

	onMount(async () => {
		const user = supabase.auth.user()
		console.log(user);
		const paypal: PayPalNamespace = await loadScript({ 'client-id': CLIENT_ID });
		paypal
			.Buttons({
				style: {
					color: 'white',
					shape: 'pill'
				},
				createOrder: function (data, actions) {
					// Set up the transaction
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: value
								}
							}
						]
					});
				},
				onApprove: function (data, actions) {
					// Capture order after payment approved
					return actions.order.capture().then(async function (details) {
						console.log("Check Done")
						await supabase.from('deposits').insert([
							{ company: 'paypal', user_id: user.id, amount: price, capture_id: details.id },
							]);
						alert('Payment successful!');
						await supabase.rpc('update_balance', {amount: price, user_id: user.id})
						
					});
				},
				onError: function (err) {
					// Log error if something goes wrong during approval
					alert('Something went wrong');
					console.log('Something went wrong', err);
				}
			})
			.render('#paypal-button-container');
	});
</script>

<div id="paypal-button-container" />

<style>
	#paypal-button-container {
		margin: 10px 5px;
	}
</style>
