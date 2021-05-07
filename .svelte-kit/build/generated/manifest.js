const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/register.svelte"),
	() => import("../../../src/routes/account.svelte"),
	() => import("../../../src/routes/content/[contentid].svelte"),
	() => import("../../../src/routes/login.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/register.svelte
	[/^\/register\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/account.svelte
	[/^\/account\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/content/[contentid].svelte
	[/^\/content\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], (m) => ({ contentid: d(m[1])})],

	// src/routes/login.svelte
	[/^\/login\/?$/, [c[0], c[6]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];