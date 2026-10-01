import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, FileSpreadsheet, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { IssueDialog } from "@/components/issue-dialog";
import { BulkPeopleImport } from "@/components/bulk-people-import";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createItem, listCategories, listItems, listStaff, listStudents, recordMovement } from "@/lib/school/queries";
import { whenAuthed } from "@/lib/school/safe";
import { cn, money } from "@/lib/utils";
import { exportItems } from "@/lib/school/excel";
import type { InventoryItem } from "@/lib/school/types";

export const Route = createFileRoute("/inventory")({
  loader: async () => {
    const [items, categories, students, staff] = await Promise.all([
      whenAuthed(listItems, []),
      whenAuthed(listCategories, []),
      whenAuthed(listStudents, []),
      whenAuthed(listStaff, []),
    ]);
    return { items, categories, students, staff };
  },
  component: InventoryPage,
});

function InventoryPage() {
  const initial = Route.useLoaderData();
  const qc = useQueryClient();
  const itemsQ = useQuery({ queryKey: ["items"], queryFn: () => listItems(), initialData: initial.items });
  const catsQ = useQuery({ queryKey: ["categories"], queryFn: () => listCategories(), initialData: initial.categories });
  const studentsQ = useQuery({ queryKey: ["students"], queryFn: () => listStudents(), initialData: initial.students });
  const staffQ = useQuery({ queryKey: ["staff"], queryFn: () => listStaff(), initialData: initial.staff });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [receiveItem, setReceiveItem] = useState<InventoryItem | null>(null);

  const rows = useMemo(() => {
    return (itemsQ.data ?? []).filter((i) => {
      const hay = `${i.sku} ${i.name} ${i.location}`.toLowerCase();
      return (!q || hay.includes(q.toLowerCase())) && (cat === "all" || String(i.categoryId) === cat);
    });
  }, [itemsQ.data, q, cat]);

  return (
    <div>
      <PageHeader
        kicker="Stores"
        title="Inventory"
        description="Every SKU on campus. Bulk import from Excel or a pasted spreadsheet. Receive deliveries or issue to a student (admission no.) or staff (TSC / ID no.)."
        actions={
          <>
            <Button variant="outline" onClick={() => exportItems(itemsQ.data ?? [])}>
              <Download className="size-4" /> Excel
            </Button>
            <Button variant="outline" onClick={() => setBulkOpen(true)}>
              <FileSpreadsheet className="size-4" /> Bulk import
            </Button>
            <Button variant="outline" onClick={() => setIssueOpen(true)}>Issue</Button>
            <Button onClick={() => setOpen(true)}><Plus className="size-4" /> Add item</Button>
          </>
        }
      />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input className="pl-9" placeholder="Search SKU, name, location" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {(catsQ.data ?? []).map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2/60 text-left text-[11px] uppercase tracking-[0.12em] text-muted">
                <th className="px-4 py-3 font-medium">Item</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">On hand</th>
                <th className="px-4 py-3 font-medium">Unit cost</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const low = item.quantityOnHand <= item.reorderLevel;
                const ratio = Math.min(100, Math.round((item.quantityOnHand / Math.max(item.reorderLevel * 2, 1)) * 100));
                return (
                  <tr key={item.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="font-mono text-[11px] text-muted">{item.sku}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{item.categoryName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("tabular-nums font-medium", low && "text-danger")}>{item.quantityOnHand} {item.unit}</span>
                        {low ? <Badge variant="warn">Reorder</Badge> : null}
                      </div>
                      <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-surface-2">
                        <div className={cn("h-full rounded-full", low ? "bg-danger" : "bg-primary")} style={{ width: `${ratio}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3 tabular-nums">{money(item.unitCost)}</td>
                    <td className="px-4 py-3 text-muted">{item.location}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline" onClick={() => setReceiveItem(item)}>Receive</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <AddItemDialog open={open} onOpenChange={setOpen} categories={catsQ.data ?? []} onSaved={() => qc.invalidateQueries({ queryKey: ["items"] })} />
      <BulkPeopleImport kind="items" open={bulkOpen} onOpenChange={setBulkOpen} />
      <ReceiveDialog item={receiveItem} onOpenChange={(v) => !v && setReceiveItem(null)} onSaved={() => { qc.invalidateQueries(); setReceiveItem(null); }} />
      <IssueDialog open={issueOpen} onOpenChange={setIssueOpen} items={itemsQ.data ?? []} students={studentsQ.data ?? []} staff={staffQ.data ?? []} />
    </div>
  );
}

function AddItemDialog({
  open, onOpenChange, categories, onSaved,
}: {
  open: boolean; onOpenChange: (v: boolean) => void;
  categories: { id: number; name: string }[]; onSaved: () => void;
}) {
  const [form, setForm] = useState({
    sku: "", name: "", categoryId: "", unit: "pcs", quantityOnHand: "0",
    reorderLevel: "5", unitCost: "0", location: "Main store", description: "",
  });
  const mut = useMutation({
    mutationFn: () => createItem({
      data: {
        sku: form.sku, name: form.name, categoryId: Number(form.categoryId), unit: form.unit,
        quantityOnHand: Number(form.quantityOnHand), reorderLevel: Number(form.reorderLevel),
        unitCost: Number(form.unitCost), location: form.location, description: form.description,
      },
    }),
    onSuccess: () => { toast.success("Item added to stores"); onSaved(); onOpenChange(false); },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>New store item</DialogTitle>
          <DialogDescription>SKU must be unique. Opening quantity posts a receive movement.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label>SKU</Label>
            <Input className="font-mono" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Category</Label>
            <Select value={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
              <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label>Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Unit</Label>
            <Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Location</Label>
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Opening qty</Label>
            <Input type="number" min={0} value={form.quantityOnHand} onChange={(e) => setForm({ ...form, quantityOnHand: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Reorder at</Label>
            <Input type="number" min={0} value={form.reorderLevel} onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label>Unit cost (KES)</Label>
            <Input type="number" min={0} value={form.unitCost} onChange={(e) => setForm({ ...form, unitCost: e.target.value })} />
          </div>
          <div className="grid gap-1.5 sm:col-span-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!form.sku || !form.name || !form.categoryId || mut.isPending} onClick={() => mut.mutate()}>
            {mut.isPending ? "Saving…" : "Save item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReceiveDialog({
  item, onOpenChange, onSaved,
}: { item: InventoryItem | null; onOpenChange: (v: boolean) => void; onSaved: () => void }) {
  const [qty, setQty] = useState("1");
  const [supplier, setSupplier] = useState("");
  const mut = useMutation({
    mutationFn: () => recordMovement({
      data: {
        itemId: item!.id, movementType: "receive", quantity: Number(qty),
        personType: "supplier", personName: supplier || "Supplier", notes: "Goods inward",
      },
    }),
    onSuccess: () => { toast.success("Stock received"); onSaved(); setQty("1"); setSupplier(""); },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receive {item?.name}</DialogTitle>
          <DialogDescription>Current on hand: {item?.quantityOnHand} {item?.unit}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>Quantity</Label>
            <Input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Supplier</Label>
            <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Optional" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={mut.isPending} onClick={() => mut.mutate()}>{mut.isPending ? "Posting…" : "Post receive"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
