import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as addStream, T as addDormitory, d as Button, j as getCampus, l as Route$9 } from "./router-BiuIvVP8.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as StatusBadge } from "./status-badge-C-PpAnPH.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campus-3TR63K10.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CampusPage() {
	const initial = Route$9.useLoaderData();
	const qc = useQueryClient();
	const data = useQuery({
		queryKey: ["campus"],
		queryFn: () => getCampus(),
		initialData: initial
	}).data ?? initial;
	const [streamClass, setStreamClass] = (0, import_react.useState)("");
	const [streamName, setStreamName] = (0, import_react.useState)("");
	const [dormBlock, setDormBlock] = (0, import_react.useState)("");
	const [dormName, setDormName] = (0, import_react.useState)("");
	const [dormCap, setDormCap] = (0, import_react.useState)("40");
	const streamMut = useMutation({
		mutationFn: () => addStream({ data: {
			classId: Number(streamClass),
			name: streamName
		} }),
		onSuccess: () => {
			toast.success("Stream added");
			qc.invalidateQueries({ queryKey: ["campus"] });
			setStreamName("");
		},
		onError: (e) => toast.error(e.message)
	});
	const dormMut = useMutation({
		mutationFn: () => addDormitory({ data: {
			blockId: Number(dormBlock),
			name: dormName,
			capacity: Number(dormCap)
		} }),
		onSuccess: () => {
			toast.success("Dormitory added");
			qc.invalidateQueries({ queryKey: ["campus"] });
			setDormName("");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Structure",
		title: "Campus",
		description: "Every class is divided into streams. Every boarding block houses several dormitories."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Classes and streams" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-5",
			children: [data.classes.map((c) => {
				const streams = data.streams.filter((s) => s.classId === c.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: streams.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-surface-2 px-3 py-1 text-xs font-medium",
						children: ["Stream ", s.name]
					}, s.id))
				})] }, c.id);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 border-t border-border pt-4 sm:grid-cols-[1fr_8rem_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: streamClass,
						onValueChange: setStreamClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Class" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: data.classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: String(c.id),
							children: c.name
						}, c.id)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "D",
						value: streamName,
						onChange: (e) => setStreamName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !streamClass || !streamName || streamMut.isPending,
						onClick: () => streamMut.mutate(),
						children: "Add stream"
					})
				]
			})]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Blocks and dormitories" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-5",
			children: [data.blocks.map((b) => {
				const dorms = data.dormitories.filter((d) => d.blockId === b.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [b.name, " block"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: b.gender })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-1.5",
					children: dorms.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								d.occupied,
								"/",
								d.capacity
							]
						})]
					}, d.id))
				})] }, b.id);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: dormBlock,
							onValueChange: setDormBlock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Block" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: data.blocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(b.id),
								children: b.name
							}, b.id)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Cedar 4",
							value: dormName,
							onChange: (e) => setDormName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "sr-only",
								children: "Capacity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								value: dormCap,
								onChange: (e) => setDormCap(e.target.value)
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !dormBlock || !dormName || dormMut.isPending,
					onClick: () => dormMut.mutate(),
					children: "Add dormitory"
				})]
			})]
		})] })]
	})] });
}
//#endregion
export { CampusPage as component };
