import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as listMovements, a as Route$4, b as formatDate, x as money } from "./router-BiuIvVP8.mjs";
import { o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as StatusBadge } from "./status-badge-C-PpAnPH.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/movements-DgoOwspj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MovementsPage() {
	const initial = Route$4.useLoaderData();
	const qy = useQuery({
		queryKey: ["movements"],
		queryFn: () => listMovements(),
		initialData: initial
	});
	const [type, setType] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		return (qy.data ?? []).filter((m) => {
			const hay = `${m.itemName} ${m.sku} ${m.personName ?? ""} ${m.personId ?? ""} ${m.notes ?? ""}`.toLowerCase();
			return (!q || hay.includes(q.toLowerCase())) && (type === "all" || m.movementType === type);
		});
	}, [
		qy.data,
		q,
		type
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Stores",
			title: "Issues and receipts",
			description: "The movement ledger. Issues record the student's admission number or the staff TSC / ID number."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Search item, name, or number",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: type,
				onValueChange: setType,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "sm:w-44",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All types"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "issue",
						children: "Issue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "receive",
						children: "Receive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "return",
						children: "Return"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "adjust",
						children: "Adjust"
					})
				] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "When"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Value"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Who"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Key"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted",
								children: formatDate(m.createdAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.itemName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-muted",
									children: m.sku
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: m.movementType })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: m.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: money(m.quantity * m.unitCost)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: m.personName ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-xs text-muted",
								children: m.personId ?? "—"
							})
						]
					}, m.id)) })]
				})
			})
		})
	] });
}
//#endregion
export { MovementsPage as component };
