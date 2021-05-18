import type { Purchase, Profile } from '$lib/Docs/types';

export type PostgrestError = {
	message: string;
	details: string;
	hint: string;
	code: string;
};

export type Response = {
	data: Purchase[] | Profile[];
	error: PostgrestError;
};
