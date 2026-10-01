import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, FileSpreadsheet, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { IssueDialog } from "@/components/issue-dialog";
import { BulkPeopleImport } from "@/components/bulk-people-import";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCampus, listItems, listStaff, listStudents, registerStudent, updateStudentStatus, emptyCampus } from "@/lib/school/queries";
import { whenAuthed } from "@/lib/school/safe";
import { formatDate } from "@/lib/utils";
import { exportStudents } from "@/lib/school/excel";
import type { Student } from "@/lib/school/types";

export const Route = createFileRoute("/students")({
  loader: async () => {
    const [students, items, staff, campus] = await Promise.all([
      whenAuthed(listStudents, []),
      whenAuthed(listItems, []),
      whenAuthed(listStaff, []),
      whenAuthed(getCampus, emptyCampus),
    ]);
    return { students, items, staff, campus };
  },
  component: StudentsPage,
});

function StudentsPage() {
  const initial = Route.useLoaderData();
  const qc = useQueryClient();
  const studentsQ = useQuery({ queryKey: ["students"], queryFn: () => listStudents(), initialData: initial.students });
  const itemsQ = useQuery({ queryKey: ["items"], queryFn: () => listItems(), initialData: initial.items });
  const staffQ = useQuery({ queryKey: ["staff"], queryFn: () => listStaff(), initialData: initial.staff });
  const campusQ = useQuery({ queryKey: ["campus"], queryFn: () => getCampus(), initialData: initial.campus });
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState("all");
  const [open, setOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [issueFor, setIssueFor] = useState<Student | null>(null);

  const rows = useMemo(() => {
    return (studentsQ.data ?? []).filter((s) => {
      const hay = `${s.admissionNo} ${s.firstName} ${s.lastName} ${s.guardianName ?? ""}`.toLowerCase();
      return (!q || hay.includes(q.toLowerCase())) && (klass === "all" || s.className === klass);
    });
  }, [studentsQ.data, q, klass]);

  const statusMut = useMutation({
    mutationFn: (payload: { admissionNo: string; status: Student["status"] }) =>
      updateStudentStatus({ data: payload }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student updated");
    },
  });

  return (
    <div>
      <PageHeader
        kicker="People"
        title="Student register"
        description="Admission number is the unique key. Place a pupil in a class stream and a dormitory under a block. Bulk import from Excel or a pasted spreadsheet."
        actions={
          <>
            <Button variant="outline" onClick={() => exportStudents(studentsQ.data ?? [])}>
              <Download className="size-4" /> Excel
            </Button>
            <Button variant="outline" onClick={() => setBulkOpen(true)}>
              <FileSpreadsheet className="size-4" /> Bulk import
            </Button>
            <Button onClick={() => setOpen(true)}><Plus className="size-4" /> Register</Button>
          </>
        }
      />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input className="pl-9" placeholder="Search admission no., name, guardian" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={klass} onValueChange={setKlass}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All classes</SelectItem>
            {(campusQ.data?.classes ?? []).map((c) => (
              <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted">
                <th className="px-4 py-3 font-medium">Admission no.</th>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Class / stream</th>
                <th className="px-4 py-3 font-medium">Block / dorm</th>
                <th className="px-4 py-3 font-medium">Guardian</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.admissionNo} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 font-mono text-[13px]">{s.admissionNo}</td>
                  <td className="px-4 py-3 font-medium">{s.firstName} {s.lastName}</td>
                  <td className="px-4 py-3">{s.classLabel}</td>
                  <td className="px-4 py-3 text-muted">
                    {s.blockName ? `${s.blockName} · ${s.dormitoryName}` : "Day"}
                  </td>
                  <td className="px-4 py-3">
                    <p>{s.guardianName ?? "—"}</p>
                    <p className="text-[11px] text-muted">{s.guardianPhone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={s.status} />
                    <p className="mt-1 text-[11px] text-subtle">Enrolled {formatDate(s.enrolledAt)}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setIssueFor(s)} disabled={s.status !== "active"}>Issue</Button>
                      {s.status === "active" ? (
                        <Button size="sm" variant="ghost" onClick={() => statusMut.mutate({ admissionNo: s.admissionNo, status: "on_leave" })}>Leave</Button>
                      ) : s.status !== "alumni" ? (
                        <Button size="sm" variant="ghost" onClick={() => statusMut.mutate({ admissionNo: s.admissionNo, status: "active" })}>Restore</Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? <p className="px-4 py-10 text-center text-sm text-muted">No students match that filter.</p> : null}
      </Card>
      <RegisterStudentDialog
        open={open}
        onOpenChange={setOpen}
        campus={campusQ.data ?? initial.campus}
        onSaved={() => qc.invalidateQueries({ queryKey: ["students"] })}
      />
      <BulkPeopleImport kind="students" open={bulkOpen} onOpenChange={setBulkOpen} />
      <IssueDialog
        open={!!issueFor}
        onOpenChange={(v) => !v && setIssueFor(null)}
        items={itemsQ.data ?? []}
        students={studentsQ.data ?? []}
        staff={staffQ.data ?? []}
        presetPerson={issueFor ? { type: "student", id: issueFor.admissionNo, name: `${issueFor.firstName} ${issueFor.lastName}` } : undefined}
      />
    </div>
  );
}

function RegisterStudentDialog({
  open, onOpenChange, campus, onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  campus: { classes: { id: number; name: string }[]; streams: { id: number; classId: number; className: string; name: string }[]; dormitories: { id: number; name: string; blockName: string }[] };
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    admissionNo: "", firstName: "", lastName: "", gender: "female", dateOfBirth: "",
    streamId: "", dormitoryId: "", guardianName: "", guardianPhone: "", notes: "",
  });
  const mut = useMutation({
    mutationFn: () => registerStudent({
      data: {
        admissionNo: form.admissionNo,
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        streamId: Number(form.streamId),
        dormitoryId: form.dormitoryId ? Number(form.dormitoryId) : undefined,
        guardianName: form.guardianName,
        guardianPhone: form.guardianPhone,
        notes: form.notes,
      },
    }),
    onSuccess: (s) => {
      toast.success(`${s.firstName} enrolled as ${s.admissionNo}`);
      onSaved();
      onOpenChange(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Register student</DialogTitle>
          <DialogDescription>Admission number is the primary key (for example 256/2025).</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Admission no.">
            <Input className="font-mono" placeholder="256/2025" value={form.admissionNo} onChange={(e) => setForm({ ...form, admissionNo: e.target.value })} />
          </Field>
          <Field label="Gender">
            <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="unspecified">Unspecified</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="First name">
            <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          </Field>
          <Field label="Last name">
            <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          </Field>
          <Field label="Class stream">
            <Select value={form.streamId} onValueChange={(v) => setForm({ ...form, streamId: v })}>
              <SelectTrigger><SelectValue placeholder="Form and stream" /></SelectTrigger>
              <SelectContent>
                {campus.streams.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>{s.className} {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Dormitory">
            <Select value={form.dormitoryId || "none"} onValueChange={(v) => setForm({ ...form, dormitoryId: v === "none" ? "" : v })}>
              <SelectTrigger><SelectValue placeholder="Block / dorm" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Day scholar</SelectItem>
                {campus.dormitories.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>{d.blockName} · {d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Date of birth">
            <Input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
          </Field>
          <Field label="Guardian">
            <Input value={form.guardianName} onChange={(e) => setForm({ ...form, guardianName: e.target.value })} />
          </Field>
          <Field label="Guardian phone">
            <Input value={form.guardianPhone} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Notes">
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!form.admissionNo || !form.firstName || !form.lastName || !form.streamId || mut.isPending} onClick={() => mut.mutate()}>
            {mut.isPending ? "Saving…" : "Enrol student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
