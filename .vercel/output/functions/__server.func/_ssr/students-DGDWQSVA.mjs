import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as FileSpreadsheet, o as Search, p as Download, s as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as listStudents, V as listStaff, Z as updateStudentStatus, b as formatDate, d as Button, j as getCampus, n as Route$1, q as registerStudent, z as listItems } from "./router-BiuIvVP8.mjs";
import { o as PageHeader, t as Card } from "./card-BgOZc_6l.mjs";
import { t as StatusBadge } from "./status-badge-C-PpAnPH.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
import { s as exportStudents } from "./excel-C4QL1_bZ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./textarea-BSDiIcHH.mjs";
import { t as IssueDialog } from "./issue-dialog-DH8Vg776.mjs";
import { t as BulkPeopleImport } from "./bulk-people-import-DeElTrvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/students-DGDWQSVA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentsPage() {
	const initial = Route$1.useLoaderData();
	const qc = useQueryClient();
	const studentsQ = useQuery({
		queryKey: ["students"],
		queryFn: () => listStudents(),
		initialData: initial.students
	});
	const itemsQ = useQuery({
		queryKey: ["items"],
		queryFn: () => listItems(),
		initialData: initial.items
	});
	const staffQ = useQuery({
		queryKey: ["staff"],
		queryFn: () => listStaff(),
		initialData: initial.staff
	});
	const campusQ = useQuery({
		queryKey: ["campus"],
		queryFn: () => getCampus(),
		initialData: initial.campus
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [klass, setKlass] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bulkOpen, setBulkOpen] = (0, import_react.useState)(false);
	const [issueFor, setIssueFor] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		return (studentsQ.data ?? []).filter((s) => {
			const hay = `${s.admissionNo} ${s.firstName} ${s.lastName} ${s.guardianName ?? ""}`.toLowerCase();
			return (!q || hay.includes(q.toLowerCase())) && (klass === "all" || s.className === klass);
		});
	}, [
		studentsQ.data,
		q,
		klass
	]);
	const statusMut = useMutation({
		mutationFn: (payload) => updateStudentStatus({ data: payload }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["students"] });
			toast.success("Student updated");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "People",
			title: "Student register",
			description: "Admission number is the unique key. Place a pupil in a class stream and a dormitory under a block. Bulk import from Excel or a pasted spreadsheet.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => exportStudents(studentsQ.data ?? []),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Excel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setBulkOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Bulk import"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Register"]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "pl-9",
					placeholder: "Search admission no., name, guardian",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: klass,
				onValueChange: setKlass,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "sm:w-44",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "all",
					children: "All classes"
				}), (campusQ.data?.classes ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: c.name,
					children: c.name
				}, c.id))] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[860px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Admission no."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Student"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Class / stream"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Block / dorm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Guardian"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 font-medium" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-[13px]",
								children: s.admissionNo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 font-medium",
								children: [
									s.firstName,
									" ",
									s.lastName
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: s.classLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted",
								children: s.blockName ? `${s.blockName} · ${s.dormitoryName}` : "Day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: s.guardianName ?? "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted",
									children: s.guardianPhone
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: s.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] text-subtle",
									children: ["Enrolled ", formatDate(s.enrolledAt)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setIssueFor(s),
										disabled: s.status !== "active",
										children: "Issue"
									}), s.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => statusMut.mutate({
											admissionNo: s.admissionNo,
											status: "on_leave"
										}),
										children: "Leave"
									}) : s.status !== "alumni" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => statusMut.mutate({
											admissionNo: s.admissionNo,
											status: "active"
										}),
										children: "Restore"
									}) : null]
								})
							})
						]
					}, s.admissionNo)) })]
				})
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-10 text-center text-sm text-muted",
				children: "No students match that filter."
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterStudentDialog, {
			open,
			onOpenChange: setOpen,
			campus: campusQ.data ?? initial.campus,
			onSaved: () => qc.invalidateQueries({ queryKey: ["students"] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkPeopleImport, {
			kind: "students",
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
				type: "student",
				id: issueFor.admissionNo,
				name: `${issueFor.firstName} ${issueFor.lastName}`
			} : void 0
		})
	] });
}
function RegisterStudentDialog({ open, onOpenChange, campus, onSaved }) {
	const [form, setForm] = (0, import_react.useState)({
		admissionNo: "",
		firstName: "",
		lastName: "",
		gender: "female",
		dateOfBirth: "",
		streamId: "",
		dormitoryId: "",
		guardianName: "",
		guardianPhone: "",
		notes: ""
	});
	const mut = useMutation({
		mutationFn: () => registerStudent({ data: {
			admissionNo: form.admissionNo,
			firstName: form.firstName,
			lastName: form.lastName,
			gender: form.gender,
			dateOfBirth: form.dateOfBirth,
			streamId: Number(form.streamId),
			dormitoryId: form.dormitoryId ? Number(form.dormitoryId) : void 0,
			guardianName: form.guardianName,
			guardianPhone: form.guardianPhone,
			notes: form.notes
		} }),
		onSuccess: (s) => {
			toast.success(`${s.firstName} enrolled as ${s.admissionNo}`);
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Register student" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Admission number is the primary key (for example 256/2025)." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Admission no.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "font-mono",
								placeholder: "256/2025",
								value: form.admissionNo,
								onChange: (e) => setForm({
									...form,
									admissionNo: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Gender",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.gender,
								onValueChange: (v) => setForm({
									...form,
									gender: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "female",
										children: "Female"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "male",
										children: "Male"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "unspecified",
										children: "Unspecified"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "First name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.firstName,
								onChange: (e) => setForm({
									...form,
									firstName: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Last name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.lastName,
								onChange: (e) => setForm({
									...form,
									lastName: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Class stream",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.streamId,
								onValueChange: (v) => setForm({
									...form,
									streamId: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Form and stream" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: campus.streams.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: String(s.id),
									children: [
										s.className,
										" ",
										s.name
									]
								}, s.id)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dormitory",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.dormitoryId || "none",
								onValueChange: (v) => setForm({
									...form,
									dormitoryId: v === "none" ? "" : v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Block / dorm" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "none",
									children: "Day scholar"
								}), campus.dormitories.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: String(d.id),
									children: [
										d.blockName,
										" · ",
										d.name
									]
								}, d.id))] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date of birth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.dateOfBirth,
								onChange: (e) => setForm({
									...form,
									dateOfBirth: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Guardian",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.guardianName,
								onChange: (e) => setForm({
									...form,
									guardianName: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Guardian phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.guardianPhone,
								onChange: (e) => setForm({
									...form,
									guardianPhone: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Notes",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.notes,
									onChange: (e) => setForm({
										...form,
										notes: e.target.value
									})
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !form.admissionNo || !form.firstName || !form.lastName || !form.streamId || mut.isPending,
					onClick: () => mut.mutate(),
					children: mut.isPending ? "Saving…" : "Enrol student"
				})] })
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { StudentsPage as component };
