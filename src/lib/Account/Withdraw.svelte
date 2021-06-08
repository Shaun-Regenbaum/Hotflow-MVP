<!-- @component Withdraw
    This component is used to make a withdrawal request that me and Avi will then see on a seperate admin screen.

	@example
	<Withdraw/>
 -->
<script lang="ts">
	import type { Withdrawal } from '$lib/Docs/types';
	import { getProfile } from '$lib/Endpoints/profile';
	import supabase from '$lib/db';

	let withdrawal: Withdrawal = {};

	let dollars = 0;

	// State Management:
	let message;
	$: submitted = false;
	$: request_finished = false;
	$: success = false;

	async function submit_withdrawal() {
		message = '';
		submitted = true;
		const user = supabase.auth.user();
		withdrawal.user_id = user.id;
		withdrawal.amount = dollars * 100;

		const user_balance = (await getProfile(user.id)).balance;
		console.log(user_balance);
		if (withdrawal.amount <= user_balance) {
			const { data, error } = await supabase.from('withdrawals').insert([withdrawal]);
			if (data) {
				const negative_amount: number = -1 * withdrawal.amount;
				await supabase.rpc('update_balance', { amount: negative_amount, user_id: user.id });
				success = true;
			} else {
				message = error.message;
			}
			request_finished = true;
		} else {
			message = "You don't have suffecient balance.";
			request_finished = true;
		}
	}
</script>

<div id="container">
	{#if submitted}
		{#if !request_finished}
			<p>Submitting...</p>
		{:else if success}
			<h3>
				Withdrawal for ${Number(withdrawal.amount / 100).toLocaleString('en', {
					minimumFractionDigits: 2
				})} successfully submitted.
			</h3>
		{:else}
			<p>{message}</p>
		{/if}
	{/if}

	<form on:submit|preventDefault={submit_withdrawal}>
		<label for="amount">Amount to Withdraw:</label>
		<span class="currency_symbol">
			<input type="number" id="amount" name="amount" step="0.01" bind:value={dollars} />
		</span>
		<fieldset>
			<label for="platform">Platform:</label>
			<input
				type="text"
				id="platform"
				name="platform"
				list="platforms"
				bind:value={withdrawal.platform}
			/>
			<datalist id="platforms">
				<option value="Venmo" /><option value="Cashapp" /><option value="Zelle" /><option
					value="Paypal"
				/><option value="Other (Just Write It Out)" /></datalist
			>
		</fieldset>
		<label for="identifier">Id/Username on Platform:</label>
		<input
			type="text"
			id="identifier"
			name="identifier"
			bind:value={withdrawal.identifier}
			required
		/>
		<label for="email">Email (for if problems arise):</label>
		<input type="email" id="email" name="email" bind:value={withdrawal.email} required />
		<label for="info">Any Additional Info/Requests?</label>
		<textarea id="info" name="info" bind:value={withdrawal.additional_info} />
		<div>
			<button type="submit">Submit Request</button>
		</div>
	</form>
</div>

<style>
	#container {
		width: 250px;
		margin: 0 auto;
		text-align: center;
	}
	.currency_symbol {
		position: relative;
	}
	.currency_symbol input {
		padding-left: 25px;
	}
	.currency_symbol:before {
		position: absolute;
		top: 0px;
		content: '$';
		left: 10px;
	}
</style>
