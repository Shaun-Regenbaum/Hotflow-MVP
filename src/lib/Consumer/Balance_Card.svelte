<!--  @component Balance_Card

	A small card that contains the balance of a user, and then either a purchase button, or a refund button. This component does not make its own API calls. It requires data from the parent. 

	@example 
	<Blurn brand_name={brand} supporters={supporters}/>

 -->
<script>
	export let user_id;
	export let balance = 40;

	export let price;
</script>

<div id="container">
	<div id="balance_container">
		<p style="font-size: 0.8rem" />
	</div>
	<button
		>Purchase for {Number(price / 100).toLocaleString('en', { minimumFractionDigits: 2 })}
	</button>
</div>
