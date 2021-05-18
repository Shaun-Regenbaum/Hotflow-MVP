import supabase from '$lib/db';

export async function lend(userId) {
	console.log(userId);
	const { data, error } = await supabase
		.from('profiles')
		.update({ balance: '40' })
		.eq('id', userId);

	console.log(data, error);
	if (data) {
		return 'Balance Updated';
	} else {
		return error;
	}
}
