import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as FileSpreadsheet, i as Upload, p as Download } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as emptyCampus, D as bulkImportExcel, H as listStudents, L as listCategories, V as listStaff, c as Route$8, d as Button, j as getCampus, z as listItems } from "./router-BiuIvVP8.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as PageHeader, r as CardDescription, t as Card } from "./card-BgOZc_6l.mjs";
import { c as parseExcelFile, i as exportFullLedger, r as downloadTemplate, t as downloadCampusLookup } from "./excel-C4QL1_bZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/import-B-gvddTy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImportPage() {
	const initial = Route$8.useLoaderData();
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
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
	const itemsQ = useQuery({
		queryKey: ["items"],
		queryFn: () => listItems(),
		initialData: initial.items
	});
	const campusQ = useQuery({
		queryKey: ["campus"],
		queryFn: () => getCampus(),
		initialData: initial.campus
	});
	const catsQ = useQuery({
		queryKey: ["categories"],
		queryFn: () => listCategories(),
		initialData: initial.categories
	});
	const [parsed, setParsed] = (0, import_react.useState)(null);
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const importMut = useMutation({
		mutationFn: () => bulkImportExcel({ data: {
			students: parsed?.students ?? [],
			staff: parsed?.staff ?? [],
			items: parsed?.items ?? []
		} }),
		onSuccess: (res) => {
			setResult(res);
			qc.invalidateQueries();
			const n = res.studentsCreated + res.studentsUpdated + res.staffCreated + res.staffUpdated + res.itemsCreated + res.itemsUpdated;
			toast.success(`Imported ${n} rows from Excel`);
		},
		onError: (e) => toast.error(e.message)
	});
	async function onFile(file) {
		setResult(null);
		const buffer = await file.arrayBuffer();
		const next = parseExcelFile(buffer);
		setParsed(next);
		setFileName(file.name);
		if (!next.students.length && !next.staff.length && !next.items.length) toast.error("No student, staff or stores rows found in that workbook");
	}
	const ready = (parsed?.students.length ?? 0) + (parsed?.staff.length ?? 0) + (parsed?.items.length ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Bulk data",
			title: "Excel fetch",
			description: "Download a workbook, fill it in Excel or Google Sheets, then upload it to load students, staff and stores in one go.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => exportFullLedger({
					students: studentsQ.data ?? [],
					staff: staffQ.data ?? [],
					items: itemsQ.data ?? []
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export ledger"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "1. Template" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "A workbook with Students, Staff and Stores sheets, plus a few sample rows." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => downloadTemplate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Download Excel template"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => downloadCampusLookup(campusQ.data ?? emptyCampus, catsQ.data ?? []),
					children: "Download campus lookup"
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "2. Upload workbook" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: ".xlsx, .xls or .csv. Headers can be admission no., TSC no., SKU, and so on." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv",
					className: "sr-only",
					onChange: (e) => {
						const file = e.target.files?.[0];
						if (file) onFile(file);
						e.target.value = "";
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
					className: "flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-surface-2/60 px-4 py-8 text-center hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: fileName ?? "Drop an Excel file or browse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Students by admission number · teachers by TSC · support by ID · items by SKU"
						})
					]
				})] })]
			})]
		}),
		parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "3. Review and import" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
					ready,
					" ready row",
					ready === 1 ? "" : "s",
					parsed.errors.length ? ` · ${parsed.errors.length} skipped` : "",
					fileName ? ` · ${fileName}` : ""
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !ready || importMut.isPending,
					onClick: () => importMut.mutate(),
					children: importMut.isPending ? "Importing…" : `Import ${ready} rows`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewTable, {
						title: "Students",
						empty: "No student rows",
						columns: [
							"Adm no.",
							"Name",
							"Class",
							"Dorm"
						],
						rows: parsed.students.map((s) => [
							s.admissionNo,
							`${s.firstName} ${s.lastName}`,
							`${s.className} ${s.streamName}`,
							s.dormitoryName ?? "Day"
						])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewTable, {
						title: "Staff",
						empty: "No staff rows",
						columns: [
							"Key",
							"Name",
							"Role",
							"Department"
						],
						rows: parsed.staff.map((s) => [
							s.tscNo ?? s.idNo ?? "",
							`${s.firstName} ${s.lastName}`,
							s.roleType === "teacher" ? "Teacher" : "Non-teaching",
							s.department
						])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewTable, {
						title: "Stores",
						empty: "No store rows",
						columns: [
							"SKU",
							"Item",
							"Qty",
							"Category"
						],
						rows: parsed.items.map((i) => [
							i.sku,
							i.name,
							String(i.quantityOnHand),
							i.category
						])
					}),
					parsed.errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-danger",
						children: "Skipped in file"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 text-sm text-danger",
						children: parsed.errors.slice(0, 12).map((err, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							err.sheet,
							" row ",
							err.row,
							": ",
							err.message
						] }, `${err.sheet}-${err.row}-${i}`))
					})] }) : null
				]
			})] })
		}) : null,
		result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, { result }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {
					title: "Students",
					body: "admission_no, first_name, last_name, class, stream. Optional: gender, date_of_birth, block, dormitory, guardian, status."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {
					title: "Staff",
					body: "role_type (teacher or non_teaching), tsc_no or id_no, first_name, last_name, job_title, department."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {
					title: "Stores",
					body: "sku, name, category, quantity_on_hand, unit_cost. Matching SKUs update the existing item."
				})
			]
		})
	] });
}
function PreviewTable({ title, empty, columns, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted",
		children: [
			title,
			" · ",
			rows.length
		]
	}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-subtle",
		children: empty
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[480px] text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted",
				children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-3 py-2 font-medium",
					children: c
				}, c))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.slice(0, 8).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-b border-border/70 last:border-0",
				children: r.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-3 py-2",
					children: cell || "—"
				}, j))
			}, i)) })]
		}), rows.length > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "px-3 py-2 text-xs text-muted",
			children: [
				"And ",
				rows.length - 8,
				" more"
			]
		}) : null]
	})] });
}
function ResultCard({ result }) {
	const stats = [
		["Students new", result.studentsCreated],
		["Students updated", result.studentsUpdated],
		["Staff new", result.staffCreated],
		["Staff updated", result.staffUpdated],
		["SKUs new", result.itemsCreated],
		["SKUs updated", result.itemsUpdated]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Import result" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Existing admission numbers, TSC / ID numbers and SKUs were updated instead of duplicated." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
			children: stats.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md bg-surface-2 px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.12em] text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-xl tabular-nums",
					children: value
				})]
			}, String(label)))
		}), result.errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-1 text-sm text-danger",
			children: result.errors.slice(0, 12).map((err, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				err.kind,
				" row ",
				err.row,
				": ",
				err.message
			] }, `${err.kind}-${err.row}-${i}`))
		}) : null] })]
	});
}
function Hint({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-medium uppercase tracking-[0.12em] text-muted",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted",
			children: body
		})]
	});
}
//#endregion
export { ImportPage as component };
