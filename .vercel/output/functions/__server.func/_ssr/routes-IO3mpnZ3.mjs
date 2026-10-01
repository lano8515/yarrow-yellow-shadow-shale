import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Boxes, a as TriangleAlert, d as FileText, n as Users, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { M as getDashboard, b as formatDate, u as Route$10, x as money, y as compactNumber } from "./router-BiuIvVP8.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as StatusBadge } from "./status-badge-C-PpAnPH.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-IO3mpnZ3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const initial = Route$10.useLoaderData();
	const { data = initial } = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => getDashboard(),
		initialData: initial
	});
	const kpis = [
		{
			label: "Active students",
			value: compactNumber(data.students),
			hint: `${data.staff} staff on roll`,
			icon: Users
		},
		{
			label: "Stock value",
			value: money(data.stockValue),
			hint: `${data.items} live SKUs`,
			icon: Boxes
		},
		{
			label: "Low stock",
			value: compactNumber(data.lowStock),
			hint: "At or below reorder",
			icon: TriangleAlert
		},
		{
			label: "Open invoices",
			value: money(data.openInvoiceTotal),
			hint: `${data.openInvoices} unpaid or draft`,
			icon: FileText
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Arden School · Term 3",
			title: "Campus ledger",
			description: "Students keyed by admission number. Teachers by TSC number, support staff by national ID. Classes sit in streams; dorms sit in blocks."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] font-medium uppercase tracking-[0.12em] text-muted",
							children: k.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, {
							className: "size-4 text-muted",
							strokeWidth: 1.75
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-2xl tabular-nums leading-none",
						children: k.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: k.hint
					})
				]
			}, k.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Value by store category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockChart, { data: data.byCategory })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Needs reorder" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/inventory",
						className: "text-xs text-primary hover:underline",
						children: "Stores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: data.lowStockItems.slice(0, 6).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-muted",
								children: item.sku
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm text-danger",
							children: [item.quantityOnHand, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: ["/", item.reorderLevel]
							})]
						})]
					}, item.id))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recent issues and receipts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/movements",
					className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
					children: ["All movements ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-left text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "When"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Who"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.recentMovements.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted",
								children: formatDate(m.createdAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.itemName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-muted",
									children: m.sku
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: m.movementType })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 tabular-nums",
								children: m.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 text-muted",
								children: [m.personName ?? "—", m.personId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 font-mono text-[11px]",
									children: m.personId
								}) : null]
							})
						]
					}, m.id)) })]
				})
			})]
		})
	] });
}
function StockChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-md bg-surface-2/60" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			barCategoryGap: 18,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "name",
					interval: 0,
					angle: -32,
					textAnchor: "end",
					height: 68,
					tick: {
						fontSize: 10,
						fill: "var(--color-muted)"
					},
					axisLine: false,
					tickLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tick: {
						fontSize: 11,
						fill: "var(--color-muted)"
					},
					axisLine: false,
					tickLine: false,
					tickFormatter: (v) => `${Math.round(Number(v) / 1e3)}k`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					cursor: { fill: "color-mix(in oklab, var(--color-primary) 8%, transparent)" },
					contentStyle: {
						background: "var(--color-surface)",
						border: "1px solid var(--color-border)",
						borderRadius: 12,
						fontSize: 12
					},
					formatter: (value) => money(Number(value ?? 0))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "value",
					fill: "var(--color-primary)",
					radius: [
						6,
						6,
						0,
						0
					]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
