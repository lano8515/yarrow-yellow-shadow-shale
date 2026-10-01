import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as FileSpreadsheet, i as Upload } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as bulkImportExcel, d as Button } from "./router-BiuIvVP8.mjs";
import { c as parseExcelFile, l as parseSpreadsheetText, n as downloadPeopleTemplate } from "./excel-C4QL1_bZ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Textarea, t as Dialog } from "./textarea-BSDiIcHH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bulk-people-import-DeElTrvF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BulkPeopleImport({ kind, open, onOpenChange }) {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [parsed, setParsed] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [paste, setPaste] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const isStudents = kind === "students";
	const title = isStudents ? "Bulk import students" : "Bulk import staff";
	const hint = isStudents ? "Admission number is the unique key. Class and stream must already exist (Form 1–4, streams A–C)." : "Teachers need a TSC number. Non-teaching staff need a national ID number.";
	function applyParsed(next, label) {
		const rows = isStudents ? next.students : next.staff;
		const wrong = isStudents ? next.staff.length : next.students.length;
		setParsed(next);
		setFileName(label);
		setResult(null);
		if (!rows.length) toast.error(isStudents ? "No student rows found" : "No staff rows found");
		else if (wrong) toast.message(`${rows.length} ${isStudents ? "student" : "staff"} rows ready. ${wrong} ${isStudents ? "staff" : "student"} rows will be ignored here.`);
	}
	async function onFile(file) {
		const buffer = await file.arrayBuffer();
		const name = file.name.toLowerCase();
		applyParsed(name.endsWith(".csv") || name.endsWith(".tsv") || name.endsWith(".txt") ? parseSpreadsheetText(new TextDecoder().decode(buffer)) : parseExcelFile(buffer), file.name);
	}
	const rows = isStudents ? parsed?.students ?? [] : parsed?.staff ?? [];
	const parseErrors = parsed?.errors ?? [];
	const mut = useMutation({
		mutationFn: () => bulkImportExcel({ data: {
			students: isStudents ? parsed?.students ?? [] : [],
			staff: isStudents ? [] : parsed?.staff ?? [],
			items: []
		} }),
		onSuccess: (res) => {
			setResult(res);
			qc.invalidateQueries({ queryKey: isStudents ? ["students"] : ["staff"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			const created = isStudents ? res.studentsCreated : res.staffCreated;
			const updated = isStudents ? res.studentsUpdated : res.staffUpdated;
			toast.success(`Imported ${created} new, updated ${updated}`);
		},
		onError: (e) => toast.error(e.message)
	});
	function close() {
		onOpenChange(false);
		setParsed(null);
		setFileName(null);
		setPaste("");
		setResult(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => v ? onOpenChange(true) : close(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: hint })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => downloadPeopleTemplate(kind),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Download template"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: ".xlsx,.xls,.csv,.tsv,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv",
							className: "sr-only",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (file) onFile(file);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							onDragOver: (e) => {
								e.preventDefault();
								e.dataTransfer.dropEffect = "copy";
							},
							onDrop: (e) => {
								e.preventDefault();
								const file = e.dataTransfer.files?.[0];
								if (file) onFile(file);
							},
							className: "flex min-h-28 w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-strong bg-surface-2/60 px-4 py-6 text-center hover:bg-surface-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: fileName ?? "Drop Excel or CSV, or browse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: ".xlsx · .csv · paste below from a spreadsheet"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-medium uppercase tracking-[0.12em] text-muted",
									children: "Or paste rows"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 5,
									value: paste,
									onChange: (e) => setPaste(e.target.value),
									placeholder: isStudents ? "admission_no	first_name	last_name	gender	class	stream\n403/2026	Asha	Njeri	female	Form 1	A" : "role_type	tsc_no	id_no	first_name	last_name	job_title	department\nteacher	TSC/90011		Paul	Otieno	History teacher	Humanities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									disabled: !paste.trim(),
									onClick: () => applyParsed(parseSpreadsheetText(paste), "Pasted rows"),
									children: "Read pasted rows"
								}) })
							]
						}),
						parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-medium uppercase tracking-[0.12em] text-muted",
									children: ["Ready · ", rows.length]
								}),
								rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-x-auto rounded-md border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full min-w-[420px] text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
											className: "border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted",
											children: isStudents ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Adm no."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Name"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Class"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Dorm"
												})
											] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Key"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Name"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Role"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-2 font-medium",
													children: "Dept"
												})
											] })
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (isStudents ? parsed.students.map((s) => [
											s.admissionNo,
											`${s.firstName} ${s.lastName}`,
											`${s.className} ${s.streamName}`,
											s.dormitoryName ?? "Day"
										]) : parsed.staff.map((s) => [
											s.tscNo ?? s.idNo ?? "",
											`${s.firstName} ${s.lastName}`,
											s.roleType === "teacher" ? "Teacher" : "Non-teaching",
											s.department
										])).slice(0, 6).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
											className: "border-b border-border/70 last:border-0",
											children: r.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2",
												children: cell || "—"
											}, j))
										}, i)) })]
									}), rows.length > 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "px-3 py-2 text-xs text-muted",
										children: [
											"And ",
											rows.length - 6,
											" more"
										]
									}) : null]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-subtle",
									children: "Nothing to import from that file yet."
								}),
								parseErrors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1 text-sm text-danger",
									children: parseErrors.slice(0, 6).map((err, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										err.sheet,
										" row ",
										err.row,
										": ",
										err.message
									] }, `${err.sheet}-${err.row}-${i}`))
								}) : null
							]
						}) : null,
						result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [isStudents ? `${result.studentsCreated} new · ${result.studentsUpdated} updated` : `${result.staffCreated} new · ${result.staffUpdated} updated`, result.errors.length ? ` · ${result.errors.length} skipped` : ""]
						}) : null,
						result?.errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1 text-sm text-danger",
							children: result.errors.slice(0, 6).map((err, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Row ",
								err.row,
								": ",
								err.message
							] }, `${err.kind}-${err.row}-${i}`))
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: close,
					children: "Close"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !rows.length || mut.isPending,
					onClick: () => mut.mutate(),
					children: mut.isPending ? "Importing…" : `Import ${rows.length} ${isStudents ? "students" : "staff"}`
				})] })
			]
		})
	});
}
//#endregion
export { BulkPeopleImport as t };
