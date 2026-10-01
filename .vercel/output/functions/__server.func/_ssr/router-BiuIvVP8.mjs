import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as redirect, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Slot, o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-BVlO8yGS.mjs";
import { bn as union, cn as _enum, dn as boolean, gn as object, hn as number, pn as literal, un as array, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker, n as auth } from "./server-DwHd3J7F.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { _ as Boxes, a as TriangleAlert, b as ArrowLeftRight, c as Menu, d as FileText, f as FileSpreadsheet, g as Building2, l as Link2, n as Users, r as UserRound, t as X, u as LayoutGrid, v as BookOpen } from "../_libs/lucide-react.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safe-Dql3Ay8L.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var emptyCampus = {
	classes: [],
	streams: [],
	blocks: [],
	dormitories: []
};
var emptyDashboard = {
	students: 0,
	staff: 0,
	teachers: 0,
	items: 0,
	lowStock: 0,
	stockValue: 0,
	openInvoices: 0,
	openInvoiceTotal: 0,
	byCategory: [],
	recentMovements: [],
	lowStockItems: []
};
var emptySettings = {
	schoolName: "Arden School",
	campus: "Ridge Campus",
	currency: "KES",
	invoicePrefix: "INV",
	apiProvider: "local",
	apiBaseUrl: null,
	lastSyncAt: null,
	lastSyncNote: null
};
var touchSession = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("92d12297c16fd5757136269ed43ad1ac347f993d4974f54b4d2bb084d250ae51"));
var listAppUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("11c47ded27a2cc0f268b8cbaa5e1560e9f30bd0683b483d3845c91716c786c1c"));
var linkStaffIdentity = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ staffIdentifier: string().min(1).max(24) })).handler(createSsrRpc("806bb39348d1136a9eab23fe9b25680f2f1185049f2e5e76bd3ac01f46836964"));
var getCampus = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1e2b137a6f4456fe86daac4cd9719ea4ab5a639c2c3bc889c1f672b6502f4905"));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2ace573fbe786a512f14693ec20db5f48c50c185463f8801e8caea0c6ec0929a"));
var listStudents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("c3cee0d68c98d86200147f639fd3be3d02128f34513449144981aa17fe5c955c"));
var listStaff = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2f293ac7ddb30a5f7625e21216584af5843fea3111ca70c1a83a5f03533b90b2"));
var listCategories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a90d692a018aedc149ccb6c8242a2301d385df0de83ded12748f192a9d81a4fc"));
var listItems = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("acfc40965ab2ec3f3f75cbce182dc7e71d96f3b280b7f23c09b3d4fc16507e07"));
var listMovements = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2508ae2b49f9f37e830d37c9164e3b104313821b3b30e2d18c85a9165c73f32c"));
var listInvoices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f713c8e74553cbaa20cd7926c1c47e235b8a9a36623a463390934a68a24ee373"));
var getSettings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ba57b48d0af654f7fe2607a8be4926f937797295ab41b9041422cc79b65cec53"));
var registerStudent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	admissionNo: string().min(2).max(24),
	firstName: string().min(1).max(80),
	lastName: string().min(1).max(80),
	gender: string().min(1).max(24),
	dateOfBirth: string().optional(),
	streamId: number(),
	dormitoryId: number().optional(),
	guardianName: string().max(80).optional(),
	guardianPhone: string().max(40).optional(),
	notes: string().max(400).optional()
})).handler(createSsrRpc("37e713838c35000a4836ae866c84ec71c7061730ab6367eb27826ca39a807427"));
var updateStudentStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	admissionNo: string(),
	status: _enum([
		"active",
		"on_leave",
		"alumni",
		"inactive"
	])
})).handler(createSsrRpc("a27808621068f3f5d83e8ff8fdc97f57280dba0eb14cdb97da903971ddc25075"));
var registerStaff = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	roleType: _enum(["teacher", "non_teaching"]),
	tscNo: string().max(24).optional(),
	idNo: string().max(24).optional(),
	firstName: string().min(1).max(80),
	lastName: string().min(1).max(80),
	jobTitle: string().min(1).max(80),
	department: string().min(1).max(80),
	phone: string().max(40).optional(),
	notes: string().max(400).optional()
})).handler(createSsrRpc("46b32bb3034ff3266746642503f9f7d725ffd3be746f4a1e9751511f5823642d"));
var updateStaffStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	identifier: string(),
	status: _enum([
		"active",
		"on_leave",
		"alumni",
		"inactive"
	])
})).handler(createSsrRpc("1ebff661ae79abb3b108b0fbb55f50e38e19847e2c5320388e86daa64e343ab0"));
var addStream = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	classId: number(),
	name: string().min(1).max(24)
})).handler(createSsrRpc("5cc6541387382997d836c6a79c0d9c6c4cf1bd8f55797c05916643dfd583940a"));
var addDormitory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	blockId: number(),
	name: string().min(1).max(40),
	capacity: number().int().min(1)
})).handler(createSsrRpc("a8228948c2e1392d1284b363e5b8ebe68e5273b7ff1ae7f4b8bbbdef4c8d7bb6"));
var createItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	sku: string().min(2).max(40),
	name: string().min(1).max(120),
	categoryId: number(),
	unit: string().min(1).max(24),
	quantityOnHand: number().int().min(0),
	reorderLevel: number().int().min(0),
	unitCost: number().min(0),
	location: string().min(1).max(80),
	description: string().max(400).optional()
})).handler(createSsrRpc("a50f739e32a614e5bb18954ddddba6bc63b2bdea51994cc3cff2f25de7ea1649"));
var recordMovement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	itemId: number(),
	movementType: _enum([
		"receive",
		"issue",
		"adjust",
		"return"
	]),
	quantity: number().int().min(1),
	personType: _enum([
		"student",
		"staff",
		"supplier"
	]).optional(),
	personId: string().max(40).optional(),
	personName: string().max(120).optional(),
	notes: string().max(400).optional(),
	charge: boolean().optional()
})).handler(createSsrRpc("b454711ff511ef2078a95840faf0368aec437a121e98c465613d3326bf2937b4"));
var createInvoice = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum(["purchase", "issue_charge"]),
	partyType: _enum([
		"student",
		"staff",
		"supplier"
	]),
	partyId: string().max(40).optional(),
	partyName: string().min(1).max(120),
	notes: string().max(400).optional(),
	receiveStock: boolean().optional(),
	lines: array(object({
		itemId: number(),
		quantity: number().int().min(1),
		unitPrice: number().min(0)
	})).min(1)
})).handler(createSsrRpc("2f752eb3bd4bd1375541b37e874f934d55cf72d7a9885d2fa6b545acc456238e"));
var setInvoiceStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"draft",
		"issued",
		"paid",
		"void"
	])
})).handler(createSsrRpc("067c1117dcbfdf4a37d64ee05ca20ff73b8823ef9d99d2166e3a74690bf4aa9f"));
var updateSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	schoolName: string().min(1).max(80),
	campus: string().min(1).max(80),
	currency: string().min(3).max(8),
	invoicePrefix: string().min(2).max(8),
	apiProvider: _enum([
		"local",
		"invoice_ninja",
		"generic_rest"
	]),
	apiBaseUrl: string().max(200).optional()
})).handler(createSsrRpc("cf299713527560640f50857e4ffeb451e13652e03fe740de9c5523466196be14"));
var previewRemoteCatalog = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	provider: _enum([
		"local",
		"invoice_ninja",
		"generic_rest"
	]),
	baseUrl: string().max(200).optional(),
	token: string().max(400).optional(),
	useSample: boolean().optional()
})).handler(createSsrRpc("6577f3dd91f466d2f5dee784f63d7bd11d778bd317e87f580d1427ff764703fb"));
var importRemoteCatalog = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	provider: _enum([
		"local",
		"invoice_ninja",
		"generic_rest"
	]),
	baseUrl: string().max(200).optional(),
	token: string().max(400).optional(),
	useSample: boolean().optional()
})).handler(createSsrRpc("88825ee19358e41d3d93ca5ed2f1d352e9cff30a877793598acd7a5379180110"));
var pushInvoiceToApi = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	invoiceId: number(),
	provider: _enum(["invoice_ninja", "generic_rest"]),
	baseUrl: string().min(8).max(200),
	token: string().min(4).max(400)
})).handler(createSsrRpc("cd8de23f8259df6241b408fec69848abef0157d7f5b646f69c771f8096b64d0f"));
var studentExcelRow = object({
	row: number(),
	admissionNo: string().min(2).max(24),
	firstName: string().min(1).max(80),
	lastName: string().min(1).max(80),
	gender: string().min(1).max(24),
	dateOfBirth: string().optional(),
	className: string().min(1).max(40),
	streamName: string().min(1).max(24),
	dormitoryName: string().max(40).optional(),
	blockName: string().max(40).optional(),
	guardianName: string().max(80).optional(),
	guardianPhone: string().max(40).optional(),
	status: string().max(24).optional(),
	notes: string().max(400).optional()
});
var staffExcelRow = object({
	row: number(),
	roleType: _enum(["teacher", "non_teaching"]),
	tscNo: string().max(24).optional(),
	idNo: string().max(24).optional(),
	firstName: string().min(1).max(80),
	lastName: string().min(1).max(80),
	jobTitle: string().min(1).max(80),
	department: string().min(1).max(80),
	phone: string().max(40).optional(),
	status: string().max(24).optional(),
	notes: string().max(400).optional()
});
var itemExcelRow = object({
	row: number(),
	sku: string().min(2).max(40),
	name: string().min(1).max(120),
	category: string().min(1).max(80),
	unit: string().min(1).max(24),
	quantityOnHand: number().int().min(0),
	reorderLevel: number().int().min(0),
	unitCost: number().min(0),
	location: string().min(1).max(80),
	description: string().max(400).optional()
});
var bulkImportExcel = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	students: array(studentExcelRow).max(500),
	staff: array(staffExcelRow).max(500),
	items: array(itemExcelRow).max(500)
})).handler(createSsrRpc("b898c9f2699c3061ab042732ee464bf31033883b8e9ccff9c95df5b587316753"));
function isUnauthorized(err) {
	return err instanceof Error && err.message === "Unauthorized";
}
async function whenAuthed(fn, fallback) {
	try {
		return await fn();
	} catch (err) {
		if (isUnauthorized(err)) return fallback;
		throw err;
	}
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-DG6UNzh9.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/utils-x9R-tiUF.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function money(value, currency = "KES") {
	return new Intl.NumberFormat("en-KE", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(Number.isFinite(value) ? value : 0);
}
function compactNumber(value) {
	return new Intl.NumberFormat("en-KE").format(value);
}
function formatDate(value) {
	if (!value) return "—";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return value.slice(0, 10);
	return d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function staffKeyLabel(kind) {
	return kind === "tsc_no" ? "TSC no." : "ID no.";
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BiuIvVP8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function Providers({ children }) {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 8e3,
		refetchOnWindowFocus: false
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "bottom-right",
			toastOptions: { className: "!bg-surface !text-fg !border-border !shadow-[var(--shadow-soft)]" }
		})] })
	});
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var Sheet = Dialog;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-fg/40", className),
	...props
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ className, children, side = "right", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex flex-col bg-surface shadow-[var(--shadow-soft)]", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l border-border", side === "left" && "inset-y-0 left-0 h-full w-full max-w-xs border-r border-border", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-sm p-2 text-muted hover:bg-surface-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pb-3 pr-12", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl font-medium", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary-hover",
			secondary: "bg-surface-2 text-fg border border-border hover:border-border-strong",
			outline: "border border-border bg-surface text-fg hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			danger: "bg-danger text-primary-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-[13px]",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var NAV = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutGrid
	},
	{
		to: "/students",
		label: "Students",
		icon: Users
	},
	{
		to: "/staff",
		label: "Staff",
		icon: UserRound
	},
	{
		to: "/campus",
		label: "Campus",
		icon: Building2
	},
	{
		to: "/inventory",
		label: "Stores",
		icon: Boxes
	},
	{
		to: "/import",
		label: "Excel",
		icon: FileSpreadsheet
	},
	{
		to: "/movements",
		label: "Issues",
		icon: ArrowLeftRight
	},
	{
		to: "/invoices",
		label: "Invoices",
		icon: FileText
	},
	{
		to: "/settings",
		label: "Link",
		icon: Link2
	}
];
var MOBILE = [
	{
		to: "/",
		label: "Home",
		icon: LayoutGrid
	},
	{
		to: "/students",
		label: "Students",
		icon: Users
	},
	{
		to: "/staff",
		label: "Staff",
		icon: UserRound
	},
	{
		to: "/inventory",
		label: "Stores",
		icon: Boxes
	}
];
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function AccountFooter() {
	const user = useCurrentUser();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 px-2 text-[10px] font-medium uppercase tracking-[0.14em] text-subtle",
			children: "Signed in"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md bg-surface-2 px-2 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}), user?.primaryEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate px-1 text-[11px] text-muted",
				children: user.primaryEmail
			}) : null]
		})]
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-surface md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-5 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-md bg-primary text-primary-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								className: "size-4",
								strokeWidth: 1.75
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[17px] leading-none",
							children: "Arden Stores"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] uppercase tracking-[0.14em] text-muted",
							children: "Ridge Campus"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-0.5 px-3",
						children: NAV.map((item) => {
							const active = isActive(pathname, item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2 hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountFooter, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-primary text-primary-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base",
						children: "Arden Stores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setOpen(true),
					"aria-label": "Menu",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 bg-surface",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 py-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg",
								children: "Arden Stores"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Ridge Campus ledger"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-col gap-0.5 px-3",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setOpen(false),
								className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm font-medium", isActive(pathname, item.to) ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountFooter, {})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "md:pl-56",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-10",
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden",
				children: MOBILE.map((item) => {
					const active = isActive(pathname, item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-primary" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							className: "size-5",
							strokeWidth: 1.75
						}), item.label]
					}, item.to);
				})
			})
		]
	});
}
function AuthFrame({ children, sessionHint }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	const signedIn = Boolean(user) || isPending && Boolean(sessionHint);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		touchSession().catch(() => void 0);
	}, [user]);
	if (pathname === "/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	if (isPending && !sessionHint) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionSplash, {});
	if (!signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children });
}
function SessionSplash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-11 place-items-center rounded-md bg-primary text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
					className: "size-5",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-display text-2xl",
				children: "Arden Stores"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Checking your staff session…"
			})
		]
	});
}
var styles_default = "/assets/styles-CnWkF2Oy.css";
var APP_NAME = "Arden Stores";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$11 = createRootRoute({
	beforeLoad: async ({ location }) => {
		const sessionUser = await fetchSessionUser();
		const path = location.pathname;
		const isPublic = path === "/login" || path.startsWith("/api/") || path.startsWith("/auth/");
		if (!sessionUser && !isPublic) throw redirect({ to: "/login" });
		return { sessionUser };
	},
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1A4A42"
			},
			{
				name: "description",
				content: "Campus inventory, student register, staff directory, and invoicing for Arden School."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	const { sessionUser } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Providers, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthFrame, {
				sessionHint: sessionUser,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-IO3mpnZ3.mjs");
var Route$10 = createFileRoute("/")({
	loader: () => whenAuthed(getDashboard, emptyDashboard),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./campus-3TR63K10.mjs");
var Route$9 = createFileRoute("/campus")({
	loader: () => whenAuthed(getCampus, emptyCampus),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./import-B-gvddTy.mjs");
var Route$8 = createFileRoute("/import")({
	loader: async () => {
		const [students, staff, items, campus, categories] = await Promise.all([
			whenAuthed(listStudents, []),
			whenAuthed(listStaff, []),
			whenAuthed(listItems, []),
			whenAuthed(getCampus, emptyCampus),
			whenAuthed(listCategories, [])
		]);
		return {
			students,
			staff,
			items,
			campus,
			categories
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./inventory-CdlOg1zi.mjs");
var Route$7 = createFileRoute("/inventory")({
	loader: async () => {
		const [items, categories, students, staff] = await Promise.all([
			whenAuthed(listItems, []),
			whenAuthed(listCategories, []),
			whenAuthed(listStudents, []),
			whenAuthed(listStaff, [])
		]);
		return {
			items,
			categories,
			students,
			staff
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./invoices-DPMe5UpB.mjs");
var Route$6 = createFileRoute("/invoices")({
	loader: async () => {
		const [invoices, items] = await Promise.all([whenAuthed(listInvoices, []), whenAuthed(listItems, [])]);
		return {
			invoices,
			items
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-M-PViE_H.mjs");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./movements-DgoOwspj.mjs");
var Route$4 = createFileRoute("/movements")({
	loader: () => whenAuthed(listMovements, []),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-N1kXMMbN.mjs");
var Route$3 = createFileRoute("/settings")({
	loader: async () => {
		const [settings, invoices, accounts, staff] = await Promise.all([
			whenAuthed(getSettings, emptySettings),
			whenAuthed(listInvoices, []),
			whenAuthed(listAppUsers, []),
			whenAuthed(listStaff, [])
		]);
		return {
			settings,
			invoices,
			accounts,
			staff
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./staff-bHNGn5Vc.mjs");
var Route$2 = createFileRoute("/staff")({
	loader: async () => {
		const [staff, items, students] = await Promise.all([
			whenAuthed(listStaff, []),
			whenAuthed(listItems, []),
			whenAuthed(listStudents, [])
		]);
		return {
			staff,
			items,
			students
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./students-DGDWQSVA.mjs");
var Route$1 = createFileRoute("/students")({
	loader: async () => {
		const [students, items, staff, campus] = await Promise.all([
			whenAuthed(listStudents, []),
			whenAuthed(listItems, []),
			whenAuthed(listStaff, []),
			whenAuthed(getCampus, emptyCampus)
		]);
		return {
			students,
			items,
			staff,
			campus
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	CampusRoute: Route$9.update({
		id: "/campus",
		path: "/campus",
		getParentRoute: () => Route$11
	}),
	ImportRoute: Route$8.update({
		id: "/import",
		path: "/import",
		getParentRoute: () => Route$11
	}),
	InventoryRoute: Route$7.update({
		id: "/inventory",
		path: "/inventory",
		getParentRoute: () => Route$11
	}),
	InvoicesRoute: Route$6.update({
		id: "/invoices",
		path: "/invoices",
		getParentRoute: () => Route$11
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$11
	}),
	MovementsRoute: Route$4.update({
		id: "/movements",
		path: "/movements",
		getParentRoute: () => Route$11
	}),
	SettingsRoute: Route$3.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$11
	}),
	StaffRoute: Route$2.update({
		id: "/staff",
		path: "/staff",
		getParentRoute: () => Route$11
	}),
	StudentsRoute: Route$1.update({
		id: "/students",
		path: "/students",
		getParentRoute: () => Route$11
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { emptyCampus as A, listMovements as B, useCurrentUser as C, bulkImportExcel as D, addStream as E, linkStaffIdentity as F, recordMovement as G, listStudents as H, listAppUsers as I, setInvoiceStatus as J, registerStaff as K, listCategories as L, getDashboard as M, getSettings as N, createInvoice as O, importRemoteCatalog as P, listInvoices as R, staffKeyLabel as S, addDormitory as T, previewRemoteCatalog as U, listStaff as V, pushInvoiceToApi as W, updateStaffStatus as X, updateSettings as Y, updateStudentStatus as Z, UserButton as _, Route$4 as a, formatDate as b, Route$8 as c, Button as d, Sheet as f, SheetTitle as g, SheetHeader as h, Route$3 as i, getCampus as j, createItem as k, Route$9 as l, SheetDescription as m, Route$1 as n, Route$6 as o, SheetContent as p, registerStudent as q, Route$2 as r, Route$7 as s, router_exports as t, Route$10 as u, cn as v, useCurrentUserState as w, money as x, compactNumber as y, listItems as z };
