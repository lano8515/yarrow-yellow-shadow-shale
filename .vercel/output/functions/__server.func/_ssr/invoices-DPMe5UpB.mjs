import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { J as setInvoiceStatus, O as createInvoice, R as listInvoices, b as formatDate, d as Button, f as Sheet, g as SheetTitle, h as SheetHeader, m as SheetDescription, o as Route$6, p as SheetContent, x as money, z as listItems } from "./router-BiuIvVP8.mjs";
import { o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as StatusBadge } from "./status-badge-C-PpAnPH.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./textarea-BSDiIcHH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-DPMe5UpB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InvoicesPage() {
	const initial = Route$6.useLoaderData();
	const qc = useQueryClient();
	const invQ = useQuery({
		queryKey: ["invoices"],
		queryFn: () => listInvoices(),
		initialData: initial.invoices
	});
	const itemsQ = useQuery({
		queryKey: ["items"],
		queryFn: () => listItems(),
		initialData: initial.items
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(null);
	const statusMut = useMutation({
		mutationFn: (payload) => setInvoiceStatus({ data: payload }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["invoices"] });
			toast.success("Invoice updated");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Finance",
			title: "Invoices",
			description: "Supplier purchases and student charges. Purchase invoices can receive stock in one step.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New invoice"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: (invQ.data ?? []).map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "text-left",
						onClick: () => setActive(inv),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted",
								children: inv.invoiceNo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: inv.partyName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [formatDate(inv.issuedAt), inv.partyId ? ` · ${inv.partyId}` : ""]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: inv.kind }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: inv.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-24 text-right font-display text-lg tabular-nums",
								children: money(inv.total)
							}),
							inv.status === "issued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => statusMut.mutate({
									id: inv.id,
									status: "paid"
								}),
								children: "Mark paid"
							}) : null
						]
					})]
				})
			}, inv.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInvoiceDialog, {
			open,
			onOpenChange: setOpen,
			items: itemsQ.data ?? [],
			onSaved: () => qc.invalidateQueries()
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: !!active,
			onOpenChange: (v) => !v && setActive(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
				className: "overflow-y-auto",
				children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: active.invoiceNo }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
					active.partyName,
					" · ",
					formatDate(active.issuedAt)
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 px-5 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: active.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: active.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-left text-[11px] uppercase tracking-[0.12em] text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Line"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Qty"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 text-right font-medium",
										children: "Amount"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: active.lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/70",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: l.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 tabular-nums",
										children: l.quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 text-right tabular-nums",
										children: money(l.quantity * l.unitPrice)
									})
								]
							}, l.id)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-right font-display text-2xl tabular-nums",
							children: money(active.total)
						})
					]
				})] }) : null
			})
		})
	] });
}
function NewInvoiceDialog({ open, onOpenChange, items, onSaved }) {
	const [kind, setKind] = (0, import_react.useState)("purchase");
	const [partyName, setPartyName] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [receiveStock, setReceiveStock] = (0, import_react.useState)(true);
	const [lines, setLines] = (0, import_react.useState)([{
		itemId: "",
		quantity: "1",
		unitPrice: ""
	}]);
	const mut = useMutation({
		mutationFn: () => createInvoice({ data: {
			kind,
			partyType: kind === "purchase" ? "supplier" : "student",
			partyName,
			notes,
			receiveStock: kind === "purchase" && receiveStock,
			lines: lines.filter((l) => l.itemId).map((l) => ({
				itemId: Number(l.itemId),
				quantity: Number(l.quantity),
				unitPrice: Number(l.unitPrice)
			}))
		} }),
		onSuccess: (inv) => {
			toast.success(`${inv.invoiceNo} posted`);
			onSaved();
			onOpenChange(false);
			setPartyName("");
			setNotes("");
			setLines([{
				itemId: "",
				quantity: "1",
				unitPrice: ""
			}]);
		},
		onError: (e) => toast.error(e.message)
	});
	const total = (0, import_react.useMemo)(() => lines.reduce((s, l) => s + Number(l.quantity || 0) * Number(l.unitPrice || 0), 0), [lines]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New invoice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Purchases restock the store. Charges bill a student or department." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kind" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: kind,
									onValueChange: (v) => setKind(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "purchase",
										children: "Purchase (supplier)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "issue_charge",
										children: "Charge (student)"
									})] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: kind === "purchase" ? "Supplier" : "Bill to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: partyName,
									onChange: (e) => setPartyName(e.target.value)
								})]
							})]
						}),
						lines.map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: line.itemId,
										onValueChange: (v) => {
											const item = items.find((i) => String(i.id) === v);
											const next = [...lines];
											next[idx] = {
												...line,
												itemId: v,
												unitPrice: item ? String(item.unitCost) : line.unitPrice
											};
											setLines(next);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose item" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: String(i.id),
											children: i.name
										}, i.id)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Qty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 1,
										value: line.quantity,
										onChange: (e) => {
											const next = [...lines];
											next[idx] = {
												...line,
												quantity: e.target.value
											};
											setLines(next);
										}
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Unit price" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										value: line.unitPrice,
										onChange: (e) => {
											const next = [...lines];
											next[idx] = {
												...line,
												unitPrice: e.target.value
											};
											setLines(next);
										}
									})]
								})
							]
						}, idx)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => setLines([...lines, {
								itemId: "",
								quantity: "1",
								unitPrice: ""
							}]),
							children: "Add line"
						}),
						kind === "purchase" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "size-4 accent-primary",
								checked: receiveStock,
								onChange: (e) => setReceiveStock(e.target.checked)
							}), "Receive these quantities into stores"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: notes,
								onChange: (e) => setNotes(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-right font-display text-xl tabular-nums",
							children: money(total)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !partyName || lines.every((l) => !l.itemId) || mut.isPending,
					onClick: () => mut.mutate(),
					children: mut.isPending ? "Posting…" : "Post invoice"
				})] })
			]
		})
	});
}
//#endregion
export { InvoicesPage as component };
