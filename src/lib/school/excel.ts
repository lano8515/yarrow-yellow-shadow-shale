import * as XLSX from "xlsx";
import type { CampusData, Category, InventoryItem, StaffMember, Student } from "./types";

export type StudentExcelRow = {
  row: number;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth?: string;
  className: string;
  streamName: string;
  dormitoryName?: string;
  blockName?: string;
  guardianName?: string;
  guardianPhone?: string;
  status?: string;
  notes?: string;
};

export type StaffExcelRow = {
  row: number;
  roleType: "teacher" | "non_teaching";
  tscNo?: string;
  idNo?: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  phone?: string;
  status?: string;
  notes?: string;
};

export type ItemExcelRow = {
  row: number;
  sku: string;
  name: string;
  category: string;
  unit: string;
  quantityOnHand: number;
  reorderLevel: number;
  unitCost: number;
  location: string;
  description?: string;
};

export type ParsedExcel = {
  students: StudentExcelRow[];
  staff: StaffExcelRow[];
  items: ItemExcelRow[];
  errors: { sheet: string; row: number; message: string }[];
  sheets: string[];
};

const HEADER_MAP: Record<string, string> = {
  admission_no: "admission_no",
  admission_number: "admission_no",
  admission: "admission_no",
  adm_no: "admission_no",
  adm: "admission_no",
  first_name: "first_name",
  firstname: "first_name",
  last_name: "last_name",
  lastname: "last_name",
  surname: "last_name",
  gender: "gender",
  sex: "gender",
  date_of_birth: "date_of_birth",
  dob: "date_of_birth",
  birth_date: "date_of_birth",
  class: "class",
  form: "class",
  stream: "stream",
  dormitory: "dormitory",
  dorm: "dormitory",
  house: "dormitory",
  block: "block",
  guardian_name: "guardian_name",
  guardian: "guardian_name",
  parent: "guardian_name",
  guardian_phone: "guardian_phone",
  phone: "phone",
  mobile: "phone",
  status: "status",
  notes: "notes",
  role: "role_type",
  role_type: "role_type",
  tsc_no: "tsc_no",
  tsc: "tsc_no",
  tsc_number: "tsc_no",
  id_no: "id_no",
  national_id: "id_no",
  id_number: "id_no",
  national_id_no: "id_no",
  job_title: "job_title",
  title: "job_title",
  designation: "job_title",
  department: "department",
  sku: "sku",
  item_code: "sku",
  name: "name",
  item: "name",
  item_name: "name",
  category: "category",
  unit: "unit",
  quantity_on_hand: "quantity_on_hand",
  quantity: "quantity_on_hand",
  qty: "quantity_on_hand",
  on_hand: "quantity_on_hand",
  reorder_level: "reorder_level",
  reorder: "reorder_level",
  unit_cost: "unit_cost",
  cost: "unit_cost",
  price: "unit_cost",
  location: "location",
  store: "location",
  description: "description",
};

function keyOf(header: unknown) {
  const raw = String(header ?? "")
    .toLowerCase()
    .replace(/[.]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  return HEADER_MAP[raw] ?? raw;
}

function cell(v: unknown) {
  if (v == null) return "";
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  return String(v).trim();
}

function excelDate(v: unknown): string | undefined {
  if (v == null || v === "") return undefined;
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  if (typeof v === "number" && Number.isFinite(v)) {
    const utc = new Date(Math.round((v - 25569) * 86400 * 1000));
    if (!Number.isNaN(utc.getTime())) return utc.toISOString().slice(0, 10);
  }
  const s = cell(v);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (m) {
    const year = m[3].length === 2 ? `20${m[3]}` : m[3];
    return `${year}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  }
  return undefined;
}

function genderOf(v: string) {
  const s = v.toLowerCase();
  if (["m", "male", "boy", "boys"].includes(s)) return "male";
  if (["f", "female", "girl", "girls"].includes(s)) return "female";
  return v || "unspecified";
}

function roleOf(v: string, tsc: string, idNo: string): "teacher" | "non_teaching" | null {
  const s = v.toLowerCase().replace(/[\s-]+/g, "_");
  if (["teacher", "teaching", "tsc", "tutor"].includes(s)) return "teacher";
  if (["non_teaching", "support", "nonteaching", "id", "staff"].includes(s)) return "non_teaching";
  if (tsc && !idNo) return "teacher";
  if (idNo && !tsc) return "non_teaching";
  return null;
}

function statusOf(v: string) {
  const s = v.toLowerCase().replace(/[\s-]+/g, "_");
  if (["active", "on_leave", "alumni", "inactive"].includes(s)) return s;
  return v ? s : "active";
}

function sheetKind(name: string, headers: string[]): "students" | "staff" | "items" | null {
  const n = name.toLowerCase();
  if (/(student|pupil|learner|register)/.test(n)) return "students";
  if (/(staff|teacher)/.test(n)) return "staff";
  if (/(store|inventor|item|stock|sku)/.test(n)) return "items";
  if (headers.includes("admission_no")) return "students";
  if (headers.includes("tsc_no") || headers.includes("id_no") || headers.includes("role_type")) return "staff";
  if (headers.includes("sku") || headers.includes("quantity_on_hand")) return "items";
  return null;
}

function rowsOf(sheet: XLSX.WorkSheet) {
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: true,
    blankrows: false,
  });
  return raw.map((row) => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row)) out[keyOf(k)] = v;
    return out;
  });
}

export function parseExcelFile(buffer: ArrayBuffer): ParsedExcel {
  return parseWorkbook(XLSX.read(buffer, { type: "array", cellDates: true }));
}

export function parseSpreadsheetText(text: string): ParsedExcel {
  const trimmed = text.replace(/^\uFEFF/, "").trim();
  if (!trimmed) {
    return { students: [], staff: [], items: [], errors: [], sheets: [] };
  }
  const first = trimmed.split(/\r?\n/, 1)[0] ?? "";
  const fs = first.includes("\t") ? "\t" : ",";
  return parseWorkbook(XLSX.read(trimmed, { type: "string", FS: fs, cellDates: true }));
}

function parseWorkbook(wb: XLSX.WorkBook): ParsedExcel {
  const result: ParsedExcel = { students: [], staff: [], items: [], errors: [], sheets: wb.SheetNames };
  for (const name of wb.SheetNames) {
    if (/guide|read ?me|campus|lookup|valid/i.test(name)) continue;
    const sheet = wb.Sheets[name];
    if (!sheet) continue;
    const raw = rowsOf(sheet);
    if (!raw[0]) continue;
    const headers = Object.keys(raw[0]);
    const kind = sheetKind(name, headers);
    if (!kind) {
      result.errors.push({ sheet: name, row: 1, message: "Could not tell if this sheet is Students, Staff, or Stores" });
      continue;
    }
    raw.forEach((r, i) => {
      const row = i + 2;
      if (kind === "students") {
        const admissionNo = cell(r.admission_no);
        const firstName = cell(r.first_name);
        const lastName = cell(r.last_name);
        const className = cell(r.class);
        const streamName = cell(r.stream);
        if (!admissionNo && !firstName && !lastName) return;
        if (!admissionNo || !firstName || !lastName || !className || !streamName) {
          result.errors.push({
            sheet: name,
            row,
            message: "Need admission number, names, class and stream",
          });
          return;
        }
        result.students.push({
          row,
          admissionNo,
          firstName,
          lastName,
          gender: genderOf(cell(r.gender)),
          dateOfBirth: excelDate(r.date_of_birth),
          className,
          streamName,
          dormitoryName: cell(r.dormitory) || undefined,
          blockName: cell(r.block) || undefined,
          guardianName: cell(r.guardian_name) || undefined,
          guardianPhone: cell(r.guardian_phone || r.phone) || undefined,
          status: statusOf(cell(r.status)),
          notes: cell(r.notes) || undefined,
        });
      } else if (kind === "staff") {
        const firstName = cell(r.first_name);
        const lastName = cell(r.last_name);
        const tscNo = cell(r.tsc_no) || undefined;
        const idNo = cell(r.id_no) || undefined;
        if (!firstName && !lastName && !tscNo && !idNo) return;
        const roleType = roleOf(cell(r.role_type), tscNo ?? "", idNo ?? "");
        const jobTitle = cell(r.job_title);
        const department = cell(r.department);
        if (!roleType || !firstName || !lastName || !jobTitle || !department) {
          result.errors.push({
            sheet: name,
            row,
            message: "Need names, role (teacher / non_teaching), job title and department",
          });
          return;
        }
        if (roleType === "teacher" && !tscNo) {
          result.errors.push({ sheet: name, row, message: "Teachers need a TSC number" });
          return;
        }
        if (roleType === "non_teaching" && !idNo) {
          result.errors.push({ sheet: name, row, message: "Non-teaching staff need a national ID number" });
          return;
        }
        result.staff.push({
          row,
          roleType,
          tscNo,
          idNo,
          firstName,
          lastName,
          jobTitle,
          department,
          phone: cell(r.phone) || undefined,
          status: statusOf(cell(r.status)),
          notes: cell(r.notes) || undefined,
        });
      } else {
        const sku = cell(r.sku).toUpperCase();
        const itemName = cell(r.name);
        if (!sku && !itemName) return;
        if (!sku || !itemName) {
          result.errors.push({ sheet: name, row, message: "Need SKU and item name" });
          return;
        }
        result.items.push({
          row,
          sku,
          name: itemName,
          category: cell(r.category) || "Stationery",
          unit: cell(r.unit) || "pcs",
          quantityOnHand: Math.max(0, Math.round(Number(r.quantity_on_hand) || 0)),
          reorderLevel: Math.max(0, Math.round(Number(r.reorder_level) || 5)),
          unitCost: Math.max(0, Number(r.unit_cost) || 0),
          location: cell(r.location) || "Main store",
          description: cell(r.description) || undefined,
        });
      }
    });
  }
  return result;
}

function sheet(data: unknown[][], name: string) {
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = data[0]?.map((h) => ({ wch: Math.max(14, String(h).length + 2) }));
  return { ws, name };
}

export function downloadTemplate() {
  const guide = [
    ["Arden Stores — bulk Excel"],
    ["Fill the Students, Staff and Stores sheets, then upload this workbook."],
    ["Do not rename the header row. Extra columns are ignored."],
    ["Students are keyed by admission_no. Teachers by tsc_no. Support staff by id_no. Items by sku."],
    ["Valid classes: Form 1–4. Streams: A, B, C. Dorms sit under a block (Cedar, Olive, Baobab, Jacaranda)."],
    ["Status: active, on_leave, alumni, inactive. Staff role_type: teacher or non_teaching."],
  ];
  const students = [
    ["admission_no", "first_name", "last_name", "gender", "date_of_birth", "class", "stream", "block", "dormitory", "guardian_name", "guardian_phone", "status", "notes"],
    ["301/2026", "Faith", "Cherono", "female", "2013-04-02", "Form 1", "B", "Olive", "Olive 1", "Mercy Cherono", "0712 000 111", "active", "Excel intake"],
    ["302/2026", "Hassan", "Ali", "male", "2012-08-19", "Form 2", "A", "Cedar", "Cedar 1", "Amina Ali", "0722 000 222", "active", ""],
  ];
  const staff = [
    ["role_type", "tsc_no", "id_no", "first_name", "last_name", "job_title", "department", "phone", "status", "notes"],
    ["teacher", "TSC/77821", "", "Mercy", "Chebet", "Physics teacher", "Sciences", "0710 441 220", "active", "Excel intake"],
    ["non_teaching", "", "33445566", "Joseph", "Mwenda", "Store clerk", "Administration", "0720 118 334", "active", ""],
  ];
  const stores = [
    ["sku", "name", "category", "unit", "quantity_on_hand", "reorder_level", "unit_cost", "location", "description"],
    ["STA-RUL-30", "30cm ruler", "Stationery", "pcs", 80, 20, 40, "Main store", "Excel intake"],
    ["KIT-SGR-1", "Sugar 1kg", "Kitchen", "kg", 40, 10, 180, "Kitchen store", ""],
  ];
  const wb = XLSX.utils.book_new();
  const g = sheet(guide, "Guide");
  const st = sheet(students, "Students");
  const sf = sheet(staff, "Staff");
  const so = sheet(stores, "Stores");
  XLSX.utils.book_append_sheet(wb, g.ws, g.name);
  XLSX.utils.book_append_sheet(wb, st.ws, st.name);
  XLSX.utils.book_append_sheet(wb, sf.ws, sf.name);
  XLSX.utils.book_append_sheet(wb, so.ws, so.name);
  XLSX.writeFile(wb, "Arden-Stores-bulk-template.xlsx");
}

const STUDENT_HEADERS = [
  "admission_no",
  "first_name",
  "last_name",
  "gender",
  "date_of_birth",
  "class",
  "stream",
  "block",
  "dormitory",
  "guardian_name",
  "guardian_phone",
  "status",
  "notes",
];

const STAFF_HEADERS = [
  "role_type",
  "tsc_no",
  "id_no",
  "first_name",
  "last_name",
  "job_title",
  "department",
  "phone",
  "status",
  "notes",
];

const SAMPLE_STUDENTS = [
  STUDENT_HEADERS,
  ["401/2026", "Faith", "Cherono", "female", "2013-04-02", "Form 1", "B", "Olive", "Olive 1", "Mercy Cherono", "0712 000 111", "active", "Bulk import"],
  ["402/2026", "Hassan", "Ali", "male", "2012-08-19", "Form 2", "A", "Cedar", "Cedar 1", "Amina Ali", "0722 000 222", "active", ""],
];

const SAMPLE_STAFF = [
  STAFF_HEADERS,
  ["teacher", "TSC/88901", "", "Mercy", "Chebet", "Physics teacher", "Sciences", "0710 441 220", "active", "Bulk import"],
  ["non_teaching", "", "55667788", "Joseph", "Mwenda", "Store clerk", "Administration", "0720 118 334", "active", ""],
];

const ITEM_HEADERS = [
  "sku",
  "name",
  "category",
  "unit",
  "quantity_on_hand",
  "reorder_level",
  "unit_cost",
  "location",
  "description",
];

const SAMPLE_ITEMS = [
  ITEM_HEADERS,
  ["STA-PPR-A4", "A4 photocopy paper", "Stationery", "ream", 40, 10, 650, "Main store", "Bulk import"],
  ["UNI-SCK-01", "Grey school socks", "Uniforms", "pair", 120, 30, 180, "Uniform store", ""],
];

export function downloadPeopleTemplate(kind: "students" | "staff" | "items") {
  const wb = XLSX.utils.book_new();
  if (kind === "students") {
    XLSX.utils.book_append_sheet(wb, sheet(SAMPLE_STUDENTS, "Students").ws, "Students");
    XLSX.writeFile(wb, "Arden-students-template.xlsx");
    return;
  }
  if (kind === "staff") {
    XLSX.utils.book_append_sheet(wb, sheet(SAMPLE_STAFF, "Staff").ws, "Staff");
    XLSX.writeFile(wb, "Arden-staff-template.xlsx");
    return;
  }
  XLSX.utils.book_append_sheet(wb, sheet(SAMPLE_ITEMS, "Stores").ws, "Stores");
  XLSX.writeFile(wb, "Arden-stores-template.xlsx");
}

export function downloadCampusLookup(campus: CampusData, categories: Category[]) {
  const streams = [
    ["class", "stream"],
    ...campus.streams.map((s) => [s.className, s.name]),
  ];
  const dorms = [
    ["block", "dormitory", "capacity", "occupied"],
    ...campus.dormitories.map((d) => [d.blockName, d.name, d.capacity, d.occupied]),
  ];
  const cats = [["category"], ...categories.map((c) => [c.name])];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet(streams, "Streams").ws, "Streams");
  XLSX.utils.book_append_sheet(wb, sheet(dorms, "Dormitories").ws, "Dormitories");
  XLSX.utils.book_append_sheet(wb, sheet(cats, "Categories").ws, "Categories");
  XLSX.writeFile(wb, "Arden-campus-lookup.xlsx");
}

export function exportStudents(rows: Student[]) {
  const data = [
    ["admission_no", "first_name", "last_name", "gender", "date_of_birth", "class", "stream", "block", "dormitory", "guardian_name", "guardian_phone", "status", "enrolled_at", "notes"],
    ...rows.map((s) => [
      s.admissionNo, s.firstName, s.lastName, s.gender, s.dateOfBirth ?? "",
      s.className, s.streamName, s.blockName ?? "", s.dormitoryName ?? "",
      s.guardianName ?? "", s.guardianPhone ?? "", s.status, s.enrolledAt, s.notes ?? "",
    ]),
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet(data, "Students").ws, "Students");
  XLSX.writeFile(wb, "Arden-students.xlsx");
}

export function exportStaff(rows: StaffMember[]) {
  const data = [
    ["role_type", "tsc_no", "id_no", "first_name", "last_name", "job_title", "department", "phone", "status", "hired_at", "notes"],
    ...rows.map((s) => [
      s.roleType, s.tscNo ?? "", s.idNo ?? "", s.firstName, s.lastName,
      s.jobTitle, s.department, s.phone ?? "", s.status, s.hiredAt, s.notes ?? "",
    ]),
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet(data, "Staff").ws, "Staff");
  XLSX.writeFile(wb, "Arden-staff.xlsx");
}

export function exportItems(rows: InventoryItem[]) {
  const data = [
    ["sku", "name", "category", "unit", "quantity_on_hand", "reorder_level", "unit_cost", "location", "description"],
    ...rows.map((i) => [
      i.sku, i.name, i.categoryName, i.unit, i.quantityOnHand, i.reorderLevel, i.unitCost, i.location, i.description ?? "",
    ]),
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet(data, "Stores").ws, "Stores");
  XLSX.writeFile(wb, "Arden-stores.xlsx");
}

export function exportFullLedger(input: {
  students: Student[];
  staff: StaffMember[];
  items: InventoryItem[];
}) {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    sheet(
      [
        ["admission_no", "first_name", "last_name", "gender", "date_of_birth", "class", "stream", "block", "dormitory", "guardian_name", "guardian_phone", "status"],
        ...input.students.map((s) => [
          s.admissionNo, s.firstName, s.lastName, s.gender, s.dateOfBirth ?? "",
          s.className, s.streamName, s.blockName ?? "", s.dormitoryName ?? "",
          s.guardianName ?? "", s.guardianPhone ?? "", s.status,
        ]),
      ],
      "Students",
    ).ws,
    "Students",
  );
  XLSX.utils.book_append_sheet(
    wb,
    sheet(
      [
        ["role_type", "tsc_no", "id_no", "first_name", "last_name", "job_title", "department", "phone", "status"],
        ...input.staff.map((s) => [
          s.roleType, s.tscNo ?? "", s.idNo ?? "", s.firstName, s.lastName, s.jobTitle, s.department, s.phone ?? "", s.status,
        ]),
      ],
      "Staff",
    ).ws,
    "Staff",
  );
  XLSX.utils.book_append_sheet(
    wb,
    sheet(
      [
        ["sku", "name", "category", "unit", "quantity_on_hand", "reorder_level", "unit_cost", "location"],
        ...input.items.map((i) => [
          i.sku, i.name, i.categoryName, i.unit, i.quantityOnHand, i.reorderLevel, i.unitCost, i.location,
        ]),
      ],
      "Stores",
    ).ws,
    "Stores",
  );
  XLSX.writeFile(wb, "Arden-ledger.xlsx");
}
