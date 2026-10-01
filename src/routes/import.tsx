import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, FileSpreadsheet, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  bulkImportExcel,
  emptyCampus,
  getCampus,
  listCategories,
  listItems,
  listStaff,
  listStudents,
} from "@/lib/school/queries";
import { whenAuthed } from "@/lib/school/safe";
import {
  downloadCampusLookup,
  downloadTemplate,
  exportFullLedger,
  parseExcelFile,
  type ParsedExcel,
} from "@/lib/school/excel";
import type { BulkImportResult } from "@/lib/school/types";

export const Route = createFileRoute("/import")({
  loader: async () => {
    const [students, staff, items, campus, categories] = await Promise.all([
      whenAuthed(listStudents, []),
      whenAuthed(listStaff, []),
      whenAuthed(listItems, []),
      whenAuthed(getCampus, emptyCampus),
      whenAuthed(listCategories, []),
    ]);
    return { students, staff, items, campus, categories };
  },
  component: ImportPage,
});

function ImportPage() {
  const initial = Route.useLoaderData();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const studentsQ = useQuery({ queryKey: ["students"], queryFn: () => listStudents(), initialData: initial.students });
  const staffQ = useQuery({ queryKey: ["staff"], queryFn: () => listStaff(), initialData: initial.staff });
  const itemsQ = useQuery({ queryKey: ["items"], queryFn: () => listItems(), initialData: initial.items });
  const campusQ = useQuery({ queryKey: ["campus"], queryFn: () => getCampus(), initialData: initial.campus });
  const catsQ = useQuery({ queryKey: ["categories"], queryFn: () => listCategories(), initialData: initial.categories });
  const [parsed, setParsed] = useState<ParsedExcel | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<BulkImportResult | null>(null);

  const importMut = useMutation({
    mutationFn: () =>
      bulkImportExcel({
        data: {
          students: parsed?.students ?? [],
          staff: parsed?.staff ?? [],
          items: parsed?.items ?? [],
        },
      }),
    onSuccess: (res) => {
      setResult(res);
      qc.invalidateQueries();
      const n = res.studentsCreated + res.studentsUpdated + res.staffCreated + res.staffUpdated + res.itemsCreated + res.itemsUpdated;
      toast.success(`Imported ${n} rows from Excel`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function onFile(file: File) {
    setResult(null);
    const buffer = await file.arrayBuffer();
    const next = parseExcelFile(buffer);
    setParsed(next);
    setFileName(file.name);
    if (!next.students.length && !next.staff.length && !next.items.length) {
      toast.error("No student, staff or stores rows found in that workbook");
    }
  }

  const ready = (parsed?.students.length ?? 0) + (parsed?.staff.length ?? 0) + (parsed?.items.length ?? 0);

  return (
    <div>
      <PageHeader
        kicker="Bulk data"
        title="Excel fetch"
        description="Download a workbook, fill it in Excel or Google Sheets, then upload it to load students, staff and stores in one go."
        actions={
          <Button
            variant="outline"
            onClick={() =>
              exportFullLedger({
                students: studentsQ.data ?? [],
                staff: staffQ.data ?? [],
                items: itemsQ.data ?? [],
              })
            }
          >
            <Download className="size-4" /> Export ledger
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>1. Template</CardTitle>
            <CardDescription>A workbook with Students, Staff and Stores sheets, plus a few sample rows.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={() => downloadTemplate()}>
              <FileSpreadsheet className="size-4" /> Download Excel template
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadCampusLookup(campusQ.data ?? emptyCampus, catsQ.data ?? [])}
            >
              Download campus lookup
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>2. Upload workbook</CardTitle>
            <CardDescription>.xlsx, .xls or .csv. Headers can be admission no., TSC no., SKU, and so on.</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onFile(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "copy";
              }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) void onFile(file);
              }}
              className="flex min-h-36 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-surface-2/60 px-4 py-8 text-center hover:bg-surface-2"
            >
              <Upload className="size-6 text-primary" />
              <span className="font-medium">{fileName ?? "Drop an Excel file or browse"}</span>
              <span className="text-sm text-muted">Students by admission number · teachers by TSC · support by ID · items by SKU</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {parsed ? (
        <div className="mt-4 grid gap-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>3. Review and import</CardTitle>
                <CardDescription>
                  {ready} ready row{ready === 1 ? "" : "s"}
                  {parsed.errors.length ? ` · ${parsed.errors.length} skipped` : ""}
                  {fileName ? ` · ${fileName}` : ""}
                </CardDescription>
              </div>
              <Button disabled={!ready || importMut.isPending} onClick={() => importMut.mutate()}>
                {importMut.isPending ? "Importing…" : `Import ${ready} rows`}
              </Button>
            </CardHeader>
            <CardContent className="grid gap-5">
              <PreviewTable
                title="Students"
                empty="No student rows"
                columns={["Adm no.", "Name", "Class", "Dorm"]}
                rows={parsed.students.map((s) => [s.admissionNo, `${s.firstName} ${s.lastName}`, `${s.className} ${s.streamName}`, s.dormitoryName ?? "Day"])}
              />
              <PreviewTable
                title="Staff"
                empty="No staff rows"
                columns={["Key", "Name", "Role", "Department"]}
                rows={parsed.staff.map((s) => [s.tscNo ?? s.idNo ?? "", `${s.firstName} ${s.lastName}`, s.roleType === "teacher" ? "Teacher" : "Non-teaching", s.department])}
              />
              <PreviewTable
                title="Stores"
                empty="No store rows"
                columns={["SKU", "Item", "Qty", "Category"]}
                rows={parsed.items.map((i) => [i.sku, i.name, String(i.quantityOnHand), i.category])}
              />
              {parsed.errors.length ? (
                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-danger">Skipped in file</p>
                  <ul className="space-y-1 text-sm text-danger">
                    {parsed.errors.slice(0, 12).map((err, i) => (
                      <li key={`${err.sheet}-${err.row}-${i}`}>
                        {err.sheet} row {err.row}: {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {result ? <ResultCard result={result} /> : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Hint title="Students" body="admission_no, first_name, last_name, class, stream. Optional: gender, date_of_birth, block, dormitory, guardian, status." />
        <Hint title="Staff" body="role_type (teacher or non_teaching), tsc_no or id_no, first_name, last_name, job_title, department." />
        <Hint title="Stores" body="sku, name, category, quantity_on_hand, unit_cost. Matching SKUs update the existing item." />
      </div>
    </div>
  );
}

function PreviewTable({
  title,
  empty,
  columns,
  rows,
}: {
  title: string;
  empty: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
        {title} · {rows.length}
      </p>
      {rows.length === 0 ? (
        <p className="text-sm text-subtle">{empty}</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted">
                {columns.map((c) => (
                  <th key={c} className="px-3 py-2 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 8).map((r, i) => (
                <tr key={i} className="border-b border-border/70 last:border-0">
                  {r.map((cell, j) => (
                    <td key={j} className="px-3 py-2">{cell || "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 8 ? <p className="px-3 py-2 text-xs text-muted">And {rows.length - 8} more</p> : null}
        </div>
      )}
    </div>
  );
}

function ResultCard({ result }: { result: BulkImportResult }) {
  const stats = [
    ["Students new", result.studentsCreated],
    ["Students updated", result.studentsUpdated],
    ["Staff new", result.staffCreated],
    ["Staff updated", result.staffUpdated],
    ["SKUs new", result.itemsCreated],
    ["SKUs updated", result.itemsUpdated],
  ];
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Import result</CardTitle>
        <CardDescription>Existing admission numbers, TSC / ID numbers and SKUs were updated instead of duplicated.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map(([label, value]) => (
            <div key={String(label)} className="rounded-md bg-surface-2 px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{label}</p>
              <p className="mt-1 font-display text-xl tabular-nums">{value}</p>
            </div>
          ))}
        </div>
        {result.errors.length ? (
          <ul className="mt-4 space-y-1 text-sm text-danger">
            {result.errors.slice(0, 12).map((err, i) => (
              <li key={`${err.kind}-${err.row}-${i}`}>
                {err.kind} row {err.row}: {err.message}
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Hint({ title, body }: { title: string; body: string }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{title}</p>
      <p className="mt-1.5 text-sm text-muted">{body}</p>
    </Card>
  );
}
