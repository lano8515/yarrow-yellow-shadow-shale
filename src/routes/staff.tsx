import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listItems, listStaff, listStudents, registerStaff, updateStaffStatus } from "@/lib/school/queries";
import { whenAuthed } from "@/lib/school/safe";
import { formatDate, staffKeyLabel } from "@/lib/utils";
import { exportStaff } from "@/lib/school/excel";
import type { StaffMember, StaffRole } from "@/lib/school/types";

export const Route = createFileRoute("/staff")({
  loader: async () => {
    const [staff, items, students] = await Promise.all([
      whenAuthed(listStaff, []),
      whenAuthed(listItems, []),
      whenAuthed(listStudents, []),
    ]);
    return { staff, items, students };
  },
  component: StaffPage,
});

const DEPTS = ["Mathematics", "Sciences", "Languages", "Humanities", "ICT", "Sports", "Administration", "Library", "Estates", "Health", "Kitchen"];

function StaffPage() {
  const initial = Route.useLoaderData();
  const qc = useQueryClient();
  const staffQ = useQuery({ queryKey: ["staff"], queryFn: () => listStaff(), initialData: initial.staff });
  const itemsQ = useQuery({ queryKey: ["items"], queryFn: () => listItems(), initialData: initial.items });
  const studentsQ = useQuery({ queryKey: ["students"], queryFn: () => listStudents(), initialData: initial.students });
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"all" | StaffRole>("all");
  const [open, setOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [issueFor, setIssueFor] = useState<StaffMember | null>(null);

  const rows = useMemo(() => {
    return (staffQ.data ?? []).filter((s) => {
      const hay = `${s.identifier} ${s.tscNo ?? ""} ${s.idNo ?? ""} ${s.firstName} ${s.lastName} ${s.jobTitle}`.toLowerCase();
      return (!q || hay.includes(q.toLowerCase())) && (role === "all" || s.roleType === role);
    });
  }, [staffQ.data, q, role]);

  const statusMut = useMutation({
    mutationFn: (payload: { identifier: string; status: StaffMember["status"] }) =>
      updateStaffStatus({ data: payload }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["staff"] });
      toast.success("Staff record updated");
    },
  });

  return (
    <div>
      <PageHeader
        kicker="People"
        title="Teachers and staff"
        description="Teaching staff are keyed by TSC number. Non-teaching staff are keyed by national ID number. Bulk import from Excel or a pasted spreadsheet."
        actions={
          <>
            <Button variant="outline" onClick={() => exportStaff(staffQ.data ?? [])}>
              <Download className="size-4" /> Excel
            </Button>
            <Button variant="outline" onClick={() => setBulkOpen(true)}>
              <FileSpreadsheet className="size-4" /> Bulk import
            </Button>
            <Button onClick={() => setOpen(true)}><Plus className="size-4" /> Add staff</Button>
          </>
        }
      />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Tabs value={role} onValueChange={(v) => setRole(v as typeof role)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="teacher">Teaching</TabsTrigger>
            <TabsTrigger value="non_teaching">Non-teaching</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input className="pl-9" placeholder="Search TSC no., ID no., name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((s) => (
          <Card key={s.identifier} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{s.firstName} {s.lastName}</p>
                <p className="text-sm text-muted">{s.jobTitle}</p>
              </div>
              <StatusBadge value={s.roleType} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span className="font-mono">
                {staffKeyLabel(s.identifierKind)} {s.identifier}
              </span>
              <span>{s.department}</span>
              <span>Hired {formatDate(s.hiredAt)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <StatusBadge value={s.status} />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={s.status !== "active"} onClick={() => setIssueFor(s)}>Issue kit</Button>
                {s.status === "active" ? (
                  <Button size="sm" variant="ghost" onClick={() => statusMut.mutate({ identifier: s.identifier, status: "on_leave" })}>Leave</Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => statusMut.mutate({ identifier: s.identifier, status: "active" })}>Restore</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <RegisterStaffDialog open={open} onOpenChange={setOpen} onSaved={() => qc.invalidateQueries({ queryKey: ["staff"] })} />
      <BulkPeopleImport kind="staff" open={bulkOpen} onOpenChange={setBulkOpen} />
      <IssueDialog
        open={!!issueFor}
        onOpenChange={(v) => !v && setIssueFor(null)}
        items={itemsQ.data ?? []}
        students={studentsQ.data ?? []}
        staff={staffQ.data ?? []}
        presetPerson={issueFor ? { type: "staff", id: issueFor.identifier, name: `${issueFor.firstName} ${issueFor.lastName}` } : undefined}
      />
    </div>
  );
}

function RegisterStaffDialog({
  open, onOpenChange, onSaved,
}: { open: boolean; onOpenChange: (v: boolean) => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", roleType: "teacher" as StaffRole, jobTitle: "",
    department: "Mathematics", phone: "", notes: "", tscNo: "", idNo: "",
  });
  const mut = useMutation({
    mutationFn: () => registerStaff({ data: form }),
    onSuccess: (s) => {
      toast.success(`${s.firstName} added as ${staffKeyLabel(s.identifierKind)} ${s.identifier}`);
      onSaved();
      onOpenChange(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add staff member</DialogTitle>
          <DialogDescription>
            Teachers use TSC number as the primary key. Non-teaching staff use national ID number.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5 sm:col-span-2">
            <Label>Role</Label>
            <Select value={form.roleType} onValueChange={(v) => setForm({ ...form, roleType: v as StaffRole })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">Teaching — TSC no.</SelectItem>
                <SelectItem value="non_teaching">Non-teaching — ID no.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.roleType === "teacher" ? (
            <div className="grid gap-1.5 sm:col-span-2">
              <Label>TSC number</Label>
              <Input className="font-mono" placeholder="458221" value={form.tscNo} onChange={(e) => setForm({ ...form, tscNo: e.target.value })} />
            </div>
          ) : (
            <div className="grid gap-1.5 sm:col-span-2">
              <Label>National ID number</Label>
              <Input className="font-mono" placeholder="28411902" value={form.idNo} onChange={(e) => setForm({ ...form, idNo: e.target.value })} />
            </div>
          )}
          <div className="grid gap-1.5">
            <Label>First name</Label>
            <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Last name</Label>
            <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Department</Label>
            <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {DEPTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label>Phone</Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label>Job title</Label>
            <Input value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label>Notes</Label>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            disabled={
              !form.firstName || !form.lastName || !form.jobTitle || mut.isPending ||
              (form.roleType === "teacher" ? !form.tscNo : !form.idNo)
            }
            onClick={() => mut.mutate()}
          >
            {mut.isPending ? "Saving…" : "Add to register"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
