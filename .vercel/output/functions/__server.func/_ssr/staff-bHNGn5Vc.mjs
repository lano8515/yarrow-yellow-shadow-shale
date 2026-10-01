import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as FileSpreadsheet, o as Search, p as Download, s as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as listStudents, K as registerStaff, S as staffKeyLabel, V as listStaff, X as updateStaffStatus, b as formatDate, d as Button, r as Route$2, v as cn, z as listItems } from "./router-BiuIvVP8.mjs";
import { o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as StatusBadge } from "./status-badge-C-PpAnPH.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
import { o as exportStaff } from "./excel-C4QL1_bZ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./textarea-BSDiIcHH.mjs";
import { t as IssueDialog } from "./issue-dialog-DH8Vg776.mjs";
import { t as BulkPeopleImport } from "./bulk-people-import-DeElTrvF.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-bHNGn5Vc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-surface-2 p-1 text-muted", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var DEPTS = [
	"Mathematics",
	"Sciences",
	"Languages",
	"Humanities",
	"ICT",
	"Sports",
	"Administration",
	"Library",
	"Estates",
	"Health",
	"Kitchen"
];
function StaffPage() {
	const initial = Route$2.useLoaderData();
	const qc = useQueryClient();
	const staffQ = useQuery({
		queryKey: ["staff"],
		queryFn: () => listStaff(),
		initialData: initial.staff
	});
	const itemsQ = useQuery({
		queryKey: ["items"],
		queryFn: () => listItems(),
		initialData: initial.items
	});
	const studentsQ = useQuery({
		queryKey: ["students"],
		queryFn: () => listStudents(),
		initialData: initial.students
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bulkOpen, setBulkOpen] = (0, import_react.useState)(false);
	const [issueFor, setIssueFor] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		return (staffQ.data ?? []).filter((s) => {
			const hay = `${s.identifier} ${s.tscNo ?? ""} ${s.idNo ?? ""} ${s.firstName} ${s.lastName} ${s.jobTitle}`.toLowerCase();
			return (!q || hay.includes(q.toLowerCase())) && (role === "all" || s.roleType === role);
		});
	}, [
		staffQ.data,
		q,
		role
	]);
	const statusMut = useMutation({
		mutationFn: (payload) => updateStaffStatus({ data: payload }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["staff"] });
			toast.success("Staff record updated");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "People",
			title: "Teachers and staff",
			description: "Teaching staff are keyed by TSC number. Non-teaching staff are keyed by national ID number. Bulk import from Excel or a pasted spreadsheet.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => exportStaff(staffQ.data ?? []),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Excel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setBulkOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Bulk import"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add staff"]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: role,
				onValueChange: (v) => setRole(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						children: "All"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "teacher",
						children: "Teaching"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "non_teaching",
						children: "Non-teaching"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "pl-9",
					placeholder: "Search TSC no., ID no., name",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								s.firstName,
								" ",
								s.lastName
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: s.jobTitle
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: s.roleType })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono",
								children: [
									staffKeyLabel(s.identifierKind),
									" ",
									s.identifier
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.department }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Hired ", formatDate(s.hiredAt)] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: s.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								disabled: s.status !== "active",
								onClick: () => setIssueFor(s),
								children: "Issue kit"
							}), s.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => statusMut.mutate({
									identifier: s.identifier,
									status: "on_leave"
								}),
								children: "Leave"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => statusMut.mutate({
									identifier: s.identifier,
									status: "active"
								}),
								children: "Restore"
							})]
						})]
					})
				]
			}, s.identifier))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterStaffDialog, {
			open,
			onOpenChange: setOpen,
			onSaved: () => qc.invalidateQueries({ queryKey: ["staff"] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkPeopleImport, {
			kind: "staff",
			open: bulkOpen,
			onOpenChange: setBulkOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueDialog, {
			open: !!issueFor,
			onOpenChange: (v) => !v && setIssueFor(null),
			items: itemsQ.data ?? [],
			students: studentsQ.data ?? [],
			staff: staffQ.data ?? [],
			presetPerson: issueFor ? {
				type: "staff",
				id: issueFor.identifier,
				name: `${issueFor.firstName} ${issueFor.lastName}`
			} : void 0
		})
	] });
}
function RegisterStaffDialog({ open, onOpenChange, onSaved }) {
	const [form, setForm] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		roleType: "teacher",
		jobTitle: "",
		department: "Mathematics",
		phone: "",
		notes: "",
		tscNo: "",
		idNo: ""
	});
	const mut = useMutation({
		mutationFn: () => registerStaff({ data: form }),
		onSuccess: (s) => {
			toast.success(`${s.firstName} added as ${staffKeyLabel(s.identifierKind)} ${s.identifier}`);
			onSaved();
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add staff member" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Teachers use TSC number as the primary key. Non-teaching staff use national ID number." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.roleType,
							onValueChange: (v) => setForm({
								...form,
								roleType: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "teacher",
								children: "Teaching — TSC no."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "non_teaching",
								children: "Non-teaching — ID no."
							})] })]
						})]
					}),
					form.roleType === "teacher" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "TSC number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "font-mono",
							placeholder: "458221",
							value: form.tscNo,
							onChange: (e) => setForm({
								...form,
								tscNo: e.target.value
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "National ID number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "font-mono",
							placeholder: "28411902",
							value: form.idNo,
							onChange: (e) => setForm({
								...form,
								idNo: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "First name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.firstName,
							onChange: (e) => setForm({
								...form,
								firstName: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Last name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.lastName,
							onChange: (e) => setForm({
								...form,
								lastName: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.department,
							onValueChange: (v) => setForm({
								...form,
								department: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEPTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: d,
								children: d
							}, d)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Job title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.jobTitle,
							onChange: (e) => setForm({
								...form,
								jobTitle: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.target.value
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
				disabled: !form.firstName || !form.lastName || !form.jobTitle || mut.isPending || (form.roleType === "teacher" ? !form.tscNo : !form.idNo),
				onClick: () => mut.mutate(),
				children: mut.isPending ? "Saving…" : "Add to register"
			})] })
		] })
	});
}
//#endregion
export { StaffPage as component };
