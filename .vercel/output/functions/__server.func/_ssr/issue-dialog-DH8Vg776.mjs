import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as recordMovement, S as staffKeyLabel, d as Button } from "./router-BiuIvVP8.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./textarea-BSDiIcHH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/issue-dialog-DH8Vg776.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IssueDialog({ open, onOpenChange, items, students, staff, presetPerson }) {
	const qc = useQueryClient();
	const [itemId, setItemId] = (0, import_react.useState)("");
	const [qty, setQty] = (0, import_react.useState)("1");
	const [who, setWho] = (0, import_react.useState)(presetPerson ? `${presetPerson.type}:${presetPerson.id}` : "");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [charge, setCharge] = (0, import_react.useState)(false);
	const people = (0, import_react.useMemo)(() => {
		const s = students.filter((p) => p.status === "active").map((p) => ({
			key: `student:${p.admissionNo}`,
			label: `${p.firstName} ${p.lastName} · Adm ${p.admissionNo}`
		}));
		const t = staff.filter((p) => p.status === "active").map((p) => ({
			key: `staff:${p.identifier}`,
			label: `${p.firstName} ${p.lastName} · ${staffKeyLabel(p.identifierKind)} ${p.identifier}`
		}));
		return [...s, ...t];
	}, [students, staff]);
	const mutation = useMutation({
		mutationFn: () => {
			const [personType, ...rest] = (presetPerson ? `${presetPerson.type}:${presetPerson.id}` : who).split(":");
			const personId = rest.join(":");
			const personName = presetPerson ? presetPerson.name : people.find((p) => p.key === who)?.label.split(" · ")[0];
			return recordMovement({ data: {
				itemId: Number(itemId),
				movementType: "issue",
				quantity: Number(qty),
				personType,
				personId,
				personName,
				notes,
				charge
			} });
		},
		onSuccess: (res) => {
			toast.success(res.invoice ? `Issued and billed as ${res.invoice.invoiceNo}` : "Item issued from stores");
			qc.invalidateQueries();
			onOpenChange(false);
			setQty("1");
			setNotes("");
			setCharge(false);
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Issue from stores" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Deduct stock and optionally raise a charge invoice." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: itemId,
							onValueChange: setItemId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose an item" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: items.filter((i) => i.isActive).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: String(i.id),
								children: [
									i.name,
									" · ",
									i.quantityOnHand,
									" ",
									i.unit
								]
							}, i.id)) })]
						})]
					}),
					!presetPerson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Issued to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: who,
							onValueChange: setWho,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Student or staff" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: p.key,
								children: p.label
							}, p.key)) })]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							value: qty,
							onChange: (e) => setQty(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: "Reason for issue"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: charge,
							onChange: (e) => setCharge(e.target.checked)
						}), "Raise a charge invoice at unit cost"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !itemId || !presetPerson && !who || mutation.isPending,
				onClick: () => mutation.mutate(),
				children: mutation.isPending ? "Issuing…" : "Issue item"
			})] })
		] })
	});
}
//#endregion
export { IssueDialog as t };
