import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<link href=\"../assets/css/tailwindoutput.css\" type=\"text/css\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-e7cec02c.js",
			css: ["/./_app/assets/start-a8cd1609.css"],
			js: ["/./_app/start-e7cec02c.js","/./_app/chunks/vendor-623f01ca.js","/./_app/chunks/preload-helper-9f12a5fd.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: "#svelte",
		template
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.ico","size":1150,"type":"image/vnd.microsoft.icon"},{"file":"profile_placeholder.png","size":3351,"type":"image/png"},{"file":"robots.txt","size":67,"type":"text/plain"}],
	layout: "src/routes/__layout.svelte",
	error: "src/routes/__error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/register\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/register.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/account\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/account.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/content\/([^/]+?)\/?$/,
						params: (m) => ({ contentid: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/content/[contentid].svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/login\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/login.svelte"],
						b: ["src/routes/__error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("..\\..\\src\\routes\\__layout.svelte"),"src/routes/__error.svelte": () => import("..\\..\\src\\routes\\__error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/register.svelte": () => import("..\\..\\src\\routes\\register.svelte"),"src/routes/account.svelte": () => import("..\\..\\src\\routes\\account.svelte"),"src/routes/content/[contentid].svelte": () => import("..\\..\\src\\routes\\content\\[contentid].svelte"),"src/routes/login.svelte": () => import("..\\..\\src\\routes\\login.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-af27a37f.js","css":["/./_app/assets/pages/__layout.svelte-980ad94b.css"],"js":["/./_app/pages/__layout.svelte-af27a37f.js","/./_app/chunks/vendor-623f01ca.js"],"styles":null},"src/routes/__error.svelte":{"entry":"/./_app/pages/__error.svelte-ed92e204.js","css":[],"js":["/./_app/pages/__error.svelte-ed92e204.js","/./_app/chunks/vendor-623f01ca.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-cd79b5e0.js","css":["/./_app/assets/pages/index.svelte-bd31bfc9.css","/./_app/assets/Logout.svelte_svelte&type=style&lang-1957b349.css","/./_app/assets/Login.svelte_svelte&type=style&lang-ba6bf343.css"],"js":["/./_app/pages/index.svelte-cd79b5e0.js","/./_app/chunks/vendor-623f01ca.js","/./_app/chunks/Login-3579287e.js","/./_app/chunks/Login.svelte_svelte&type=style&lang-72542796.js","/./_app/chunks/preload-helper-9f12a5fd.js"],"styles":null},"src/routes/register.svelte":{"entry":"/./_app/pages/register.svelte-6d7be0bd.js","css":["/./_app/assets/Login.svelte_svelte&type=style&lang-ba6bf343.css"],"js":["/./_app/pages/register.svelte-6d7be0bd.js","/./_app/chunks/vendor-623f01ca.js","/./_app/chunks/Login-3579287e.js","/./_app/chunks/Login.svelte_svelte&type=style&lang-72542796.js","/./_app/chunks/preload-helper-9f12a5fd.js"],"styles":null},"src/routes/account.svelte":{"entry":"/./_app/pages/account.svelte-8bb8c37c.js","css":[],"js":["/./_app/pages/account.svelte-8bb8c37c.js","/./_app/chunks/vendor-623f01ca.js"],"styles":null},"src/routes/content/[contentid].svelte":{"entry":"/./_app/pages/content/[contentid].svelte-e5b66d86.js","css":["/./_app/assets/pages/content/[contentid].svelte-cca225ea.css","/./_app/assets/Logout.svelte_svelte&type=style&lang-1957b349.css","/./_app/assets/Login.svelte_svelte&type=style&lang-ba6bf343.css"],"js":["/./_app/pages/content/[contentid].svelte-e5b66d86.js","/./_app/chunks/vendor-623f01ca.js","/./_app/chunks/Login.svelte_svelte&type=style&lang-72542796.js","/./_app/chunks/preload-helper-9f12a5fd.js"],"styles":null},"src/routes/login.svelte":{"entry":"/./_app/pages/login.svelte-23b02870.js","css":["/./_app/assets/Login.svelte_svelte&type=style&lang-ba6bf343.css"],"js":["/./_app/pages/login.svelte-23b02870.js","/./_app/chunks/vendor-623f01ca.js","/./_app/chunks/Login-3579287e.js","/./_app/chunks/Login.svelte_svelte&type=style&lang-72542796.js","/./_app/chunks/preload-helper-9f12a5fd.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"","assets":"/."} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}