import * as api from '$lib/backendlessAPI';

type balanceData = {
	balance: number;
};

export async function addBalance(amount: number, objectId: string, token: string) {
	//First we need to get the current balance, then we can update it.
	const path1: string = `users/${objectId}?props=balance`;
	const path2: string = `users/${objectId}`;

	// Making the call:
	const response1: balanceData = await api.get(path1, token);
	let originalBalance: number = response1.balance;
	const data: balanceData = {
		balance: originalBalance + amount
	};

	const response2: balanceData = await api.put(path2, data, token);

	// Checking to see if it was a success
	let responseStatus = response2.balance ? true : false;

	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response2 };
}

export async function subtractBalance(amount: number, objectId: string, token: string) {
	//First we need to get the current balance, then we can update it.
	const path1: string = `users/${objectId}?props=balance`;
	const path2: string = `users/${objectId}`;

	// Making the call:
	const response1: balanceData = await api.get(path1, token);
	let originalBalance: number = response1.balance;
	const data: balanceData = {
		balance: originalBalance - amount
	};

	const response2: balanceData = await api.put(path2, data, token);

	// Checking to see if it was a success
	let responseStatus = response2.balance ? true : false;

	// Returning a custom object that contains success/failure and everything else.
	return { status: responseStatus, body: response2 };
}
