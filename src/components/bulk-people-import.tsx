import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileSpreadsheet, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { bulkImportExcel } from "@/lib/school/queries";
import {
  downloadPeopleTemplate,
  parseExcelFile,
  parseSpreadsheetText,
  type ParsedExcel,
} from "@/lib/school/excel";
import type { BulkImportResult } from "@/lib/school/types";

type Kind = "students" | "staff" | "items";

const COPY: Record<Kind, {
  title: string;
  hint: string;
  noun: string;
  empty: string;
  placeholder: string;
  queryKey: string;
  columns: string[];
}> = {
  students: {
    title: "Bulk import students",
    hint: "Admission number is the unique key. Class and stream must already exist (Form 1–4, streams A–C).",
    noun: "students",
    empty: "No student rows found",
    placeholder: "admission_no\tfirst_name\tlast_name\tgender\tclass\tstream\n403/2026\tAsha\tNjeri\tfemale\tForm 1\tA",
    queryKey: "students",
    columns: ["Adm no.", "Name", "Class", "Dorm"],
  },
  staff: {
    title: "Bulk import staff",
    hint: "Teachers need a TSC number. Non-teaching staff need a national ID number.",
    noun: "staff",
    empty: "No staff rows found",
    placeholder: "role_type\ttsc_no\tid_no\tfirst_name\tlast_name\tjob_title\tdepartment\nteacher\tTSC/90011\t\tPaul\tOtieno\tHistory teacher\tHumanities",
    queryKey: "staff",
    columns: ["Key", "Name", "Role", "Dept"],
  },
  items: {
    title: "Bulk import stores",
    hint: "SKU is the unique key. Matching SKUs update the existing item. Category should match a stores category (Stationery, Uniforms, Kitchen…).",
    noun: "items",
    empty: "No store rows found",
    placeholder: "sku\tname\tcategory\tunit\tquantity_on_hand\treorder_level\tunit_cost\tlocation\nLAB-GLV-M\tLab gloves M\tLaboratory\tbox\t25\t8\t420\tLab store",
    queryKey: "items",
    columns: ["SKU", "Item", "Qty", "Category"],
  },
};

function kindRows(parsed: ParsedExcel, kind: Kind) {
  if (kind === "students") return parsed.students;
  if (kind === "staff") return parsed.staff;
  return parsed.items;
}

function otherCount(parsed: ParsedExcel, kind: Kind) {
  if (kind === "students") return parsed.staff.length + parsed.items.length;
  if (kind === "staff") return parsed.students.length + parsed.items.length;
  return parsed.students.length + parsed.staff.length;
}

function previewRows(parsed: ParsedExcel, kind: Kind): string[][] {
  if (kind === "students") {
    return parsed.students.map((s) => [
      s.admissionNo,
      `${s.firstName} ${s.lastName}`,
      `${s.className} ${s.streamName}`,
      s.dormitoryName ?? "Day",
    ]);
  }
  if (kind === "staff") {
    return parsed.staff.map((s) => [
      s.tscNo ?? s.idNo ?? "",
      `${s.firstName} ${s.lastName}`,
      s.roleType === "teacher" ? "Teacher" : "Non-teaching",
      s.department,
    ]);
  }
  return parsed.items.map((i) => [i.sku, i.name, String(i.quantityOnHand), i.category]);
}

function countsOf(result: BulkImportResult, kind: Kind) {
  if (kind === "students") return { created: result.studentsCreated, updated: result.studentsUpdated };
  if (kind === "staff") return { created: result.staffCreated, updated: result.staffUpdated };
  return { created: result.itemsCreated, updated: result.itemsUpdated };
}

export function BulkPeopleImport({
  kind,
  open,
  onOpenChange,
}: {
  kind: Kind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [parsed, setParsed] = useState<ParsedExcel | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [paste, setPaste] = useState("");
  const [result, setResult] = useState<BulkImportResult | null>(null);
  const copy = COPY[kind];

  function applyParsed(next: ParsedExcel, label: string) {
    const rows = kindRows(next, kind);
    const wrong = otherCount(next, kind);
    setParsed(next);
    setFileName(label);
    setResult(null);
    if (!rows.length) {
      toast.error(copy.empty);
    } else if (wrong) {
      toast.message(`${rows.length} ${copy.noun} ready. ${wrong} other-sheet rows will be ignored here.`);
    }
  }

  async function onFile(file: File) {
    const buffer = await file.arrayBuffer();
    const name = file.name.toLowerCase();
    const next = name.endsWith(".csv") || name.endsWith(".tsv") || name.endsWith(".txt")
      ? parseSpreadsheetText(new TextDecoder().decode(buffer))
      : parseExcelFile(buffer);
    applyParsed(next, file.name);
  }

  const rows = parsed ? kindRows(parsed, kind) : [];
  const parseErrors = parsed?.errors ?? [];

  const mut = useMutation({
    mutationFn: () =>
      bulkImportExcel({
        data: {
          students: kind === "students" ? parsed?.students ?? [] : [],
          staff: kind === "staff" ? parsed?.staff ?? [] : [],
          items: kind === "items" ? parsed?.items ?? [] : [],
        },
      }),
    onSuccess: (res) => {
      setResult(res);
      qc.invalidateQueries({ queryKey: [copy.queryKey] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      const { created, updated } = countsOf(res, kind);
      toast.success(`Imported ${created} new, updated ${updated}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function close() {
    onOpenChange(false);
    setParsed(null);
    setFileName(null);
    setPaste("");
    setResult(null);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.hint}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => downloadPeopleTemplate(kind)}>
              <FileSpreadsheet className="size-4" /> Download template
            </Button>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls,.csv,.tsv,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
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
            className="flex min-h-28 w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-strong bg-surface-2/60 px-4 py-6 text-center hover:bg-surface-2"
          >
            <Upload className="size-5 text-primary" />
            <span className="text-sm font-medium">{fileName ?? "Drop Excel or CSV, or browse"}</span>
            <span className="text-xs text-muted">.xlsx · .csv · paste below from a spreadsheet</span>
          </button>

          <div className="grid gap-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Or paste rows</label>
            <Textarea
              rows={5}
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              placeholder={copy.placeholder}
            />
            <div>
              <Button
                variant="outline"
                size="sm"
                disabled={!paste.trim()}
                onClick={() => applyParsed(parseSpreadsheetText(paste), "Pasted rows")}
              >
                Read pasted rows
              </Button>
            </div>
          </div>

          {parsed ? (
            <div className="grid gap-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                Ready · {rows.length}
              </p>
              {rows.length ? (
                <div className="overflow-x-auto rounded-md border border-border">
                  <table className="w-full min-w-[420px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted">
                        {copy.columns.map((c) => (
                          <th key={c} className="px-3 py-2 font-medium">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows(parsed, kind).slice(0, 6).map((r, i) => (
                        <tr key={i} className="border-b border-border/70 last:border-0">
                          {r.map((cell, j) => (
                            <td key={j} className="px-3 py-2">{cell || "—"}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {rows.length > 6 ? (
                    <p className="px-3 py-2 text-xs text-muted">And {rows.length - 6} more</p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-subtle">Nothing to import from that file yet.</p>
              )}
              {parseErrors.length ? (
                <ul className="space-y-1 text-sm text-danger">
                  {parseErrors.slice(0, 6).map((err, i) => (
                    <li key={`${err.sheet}-${err.row}-${i}`}>
                      {err.sheet} row {err.row}: {err.message}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {result ? (
            <p className="text-sm">
              {countsOf(result, kind).created} new · {countsOf(result, kind).updated} updated
              {result.errors.length ? ` · ${result.errors.length} skipped` : ""}
            </p>
          ) : null}
          {result?.errors.length ? (
            <ul className="space-y-1 text-sm text-danger">
              {result.errors.slice(0, 6).map((err, i) => (
                <li key={`${err.kind}-${err.row}-${i}`}>
                  Row {err.row}: {err.message}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close}>Close</Button>
          <Button disabled={!rows.length || mut.isPending} onClick={() => mut.mutate()}>
            {mut.isPending ? "Importing…" : `Import ${rows.length} ${copy.noun}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
