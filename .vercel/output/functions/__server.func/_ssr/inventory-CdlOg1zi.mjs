import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as FileSpreadsheet, o as Search, p as Download, s as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as recordMovement, H as listStudents, L as listCategories, V as listStaff, d as Button, k as createItem, s as Route$7, v as cn, x as money, z as listItems } from "./router-BiuIvVP8.mjs";
import { o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as Badge } from "./badge-BzBIJWVH.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
import { a as exportItems } from "./excel-C4QL1_bZ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./textarea-BSDiIcHH.mjs";
import { t as IssueDialog } from "./issue-dialog-DH8Vg776.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-CdlOg1zi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryPage() {
	const initial = Route$7.useLoaderData();
	const qc = useQueryClient();
	const itemsQ = useQuery({
		queryKey: ["items"],
		queryFn: () => listItems(),
		initialData: initial.items
	});
	const catsQ = useQuery({
		queryKey: ["categories"],
		queryFn: () => listCategories(),
		initialData: initial.categories
	});
	const studentsQ = useQuery({
		queryKey: ["students"],
		queryFn: () => listStudents(),
		initialData: initial.students
	});
	const staffQ = useQuery({
		queryKey: ["staff"],
		queryFn: () => listStaff(),
		initialData: initial.staff
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [issueOpen, setIssueOpen] = (0, import_react.useState)(false);
	const [receiveItem, setReceiveItem] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		return (itemsQ.data ?? []).filter((i) => {
			const hay = `${i.sku} ${i.name} ${i.location}`.toLowerCase();
			return (!q || hay.includes(q.toLowerCase())) && (cat === "all" || String(i.categoryId) === cat);
		});
	}, [
		itemsQ.data,
		q,
		cat
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Stores",
			title: "Inventory",
			description: "Every SKU on campus. Receive deliveries or issue to a student (admission no.) or staff (TSC / ID no.).",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => exportItems(itemsQ.data ?? []),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Excel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/import",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Import"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setIssueOpen(true),
					children: "Issue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add item"]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "pl-9",
					placeholder: "Search SKU, name, location",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: cat,
				onValueChange: setCat,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "sm:w-48",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "all",
					children: "All categories"
				}), (catsQ.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: String(c.id),
					children: c.name
				}, c.id))] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[780px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "On hand"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Unit cost"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 font-medium" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((item) => {
						const low = item.quantityOnHand <= item.reorderLevel;
						const ratio = Math.min(100, Math.round(item.quantityOnHand / Math.max(item.reorderLevel * 2, 1) * 100));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] text-muted",
										children: item.sku
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted",
									children: item.categoryName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("tabular-nums font-medium", low && "text-danger"),
											children: [
												item.quantityOnHand,
												" ",
												item.unit
											]
										}), low ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "warn",
											children: "Reorder"
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-surface-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full", low ? "bg-danger" : "bg-primary"),
											style: { width: `${ratio}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular-nums",
									children: money(item.unitCost)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted",
									children: item.location
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setReceiveItem(item),
										children: "Receive"
									})
								})
							]
						}, item.id);
					}) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddItemDialog, {
			open,
			onOpenChange: setOpen,
			categories: catsQ.data ?? [],
			onSaved: () => qc.invalidateQueries({ queryKey: ["items"] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiveDialog, {
			item: receiveItem,
			onOpenChange: (v) => !v && setReceiveItem(null),
			onSaved: () => {
				qc.invalidateQueries();
				setReceiveItem(null);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueDialog, {
			open: issueOpen,
			onOpenChange: setIssueOpen,
			items: itemsQ.data ?? [],
			students: studentsQ.data ?? [],
			staff: staffQ.data ?? []
		})
	] });
}
function AddItemDialog({ open, onOpenChange, categories, onSaved }) {
	const [form, setForm] = (0, import_react.useState)({
		sku: "",
		name: "",
		categoryId: "",
		unit: "pcs",
		quantityOnHand: "0",
		reorderLevel: "5",
		unitCost: "0",
		location: "Main store",
		description: ""
	});
	const mut = useMutation({
		mutationFn: () => createItem({ data: {
			sku: form.sku,
			name: form.name,
			categoryId: Number(form.categoryId),
			unit: form.unit,
			quantityOnHand: Number(form.quantityOnHand),
			reorderLevel: Number(form.reorderLevel),
			unitCost: Number(form.unitCost),
			location: form.location,
			description: form.description
		} }),
		onSuccess: () => {
			toast.success("Item added to stores");
			onSaved();
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New store item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "SKU must be unique. Opening quantity posts a receive movement." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SKU" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "font-mono",
								value: form.sku,
								onChange: (e) => setForm({
									...form,
									sku: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.categoryId,
								onValueChange: (v) => setForm({
									...form,
									categoryId: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(c.id),
									children: c.name
								}, c.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Unit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.unit,
								onChange: (e) => setForm({
									...form,
									unit: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.location,
								onChange: (e) => setForm({
									...form,
									location: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Opening qty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: form.quantityOnHand,
								onChange: (e) => setForm({
									...form,
									quantityOnHand: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Reorder at" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: form.reorderLevel,
								onChange: (e) => setForm({
									...form,
									reorderLevel: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Unit cost (KES)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: form.unitCost,
								onChange: (e) => setForm({
									...form,
									unitCost: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: form.description,
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !form.sku || !form.name || !form.categoryId || mut.isPending,
					onClick: () => mut.mutate(),
					children: mut.isPending ? "Saving…" : "Save item"
				})] })
			]
		})
	});
}
function ReceiveDialog({ item, onOpenChange, onSaved }) {
	const [qty, setQty] = (0, import_react.useState)("1");
	const [supplier, setSupplier] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: () => recordMovement({ data: {
			itemId: item.id,
			movementType: "receive",
			quantity: Number(qty),
			personType: "supplier",
			personName: supplier || "Supplier",
			notes: "Goods inward"
		} }),
		onSuccess: () => {
			toast.success("Stock received");
			onSaved();
			setQty("1");
			setSupplier("");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!item,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Receive ", item?.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"Current on hand: ",
				item?.quantityOnHand,
				" ",
				item?.unit
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						value: qty,
						onChange: (e) => setQty(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Supplier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: supplier,
						onChange: (e) => setSupplier(e.target.value),
						placeholder: "Optional"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: mut.isPending,
				onClick: () => mut.mutate(),
				children: mut.isPending ? "Posting…" : "Post receive"
			})] })
		] })
	});
}
//#endregion
export { InventoryPage as component };
