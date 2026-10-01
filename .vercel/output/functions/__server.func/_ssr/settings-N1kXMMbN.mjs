import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as useCurrentUser, F as linkStaffIdentity, I as listAppUsers, N as getSettings, P as importRemoteCatalog, R as listInvoices, U as previewRemoteCatalog, V as listStaff, W as pushInvoiceToApi, Y as updateSettings, _ as UserButton, b as formatDate, d as Button, i as Route$3 } from "./router-BiuIvVP8.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, o as PageHeader, r as CardDescription, t as Card } from "./card-BgOZc_6l.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BwFVkM2w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-N1kXMMbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const initial = Route$3.useLoaderData();
	const qc = useQueryClient();
	const user = useCurrentUser();
	const settingsQ = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings(),
		initialData: initial.settings
	});
	const invQ = useQuery({
		queryKey: ["invoices"],
		queryFn: () => listInvoices(),
		initialData: initial.invoices
	});
	const accountsQ = useQuery({
		queryKey: ["app-users"],
		queryFn: () => listAppUsers(),
		initialData: initial.accounts
	});
	const staffQ = useQuery({
		queryKey: ["staff"],
		queryFn: () => listStaff(),
		initialData: initial.staff
	});
	const s = settingsQ.data;
	const [schoolName, setSchoolName] = (0, import_react.useState)(null);
	const [campus, setCampus] = (0, import_react.useState)(null);
	const [currency, setCurrency] = (0, import_react.useState)(null);
	const [prefix, setPrefix] = (0, import_react.useState)(null);
	const [provider, setProvider] = (0, import_react.useState)(null);
	const [baseUrl, setBaseUrl] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)("");
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [source, setSource] = (0, import_react.useState)(null);
	const [staffId, setStaffId] = (0, import_react.useState)("");
	const filled = s ? {
		schoolName: schoolName ?? s.schoolName,
		campus: campus ?? s.campus,
		currency: currency ?? s.currency,
		prefix: prefix ?? s.invoicePrefix,
		provider: provider ?? s.apiProvider,
		baseUrl: baseUrl ?? s.apiBaseUrl ?? ""
	} : null;
	const saveMut = useMutation({
		mutationFn: () => updateSettings({ data: {
			schoolName: filled.schoolName,
			campus: filled.campus,
			currency: filled.currency,
			invoicePrefix: filled.prefix,
			apiProvider: filled.provider,
			apiBaseUrl: filled.baseUrl
		} }),
		onSuccess: () => {
			toast.success("Settings saved");
			qc.invalidateQueries({ queryKey: ["settings"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const previewMut = useMutation({
		mutationFn: (useSample) => previewRemoteCatalog({ data: {
			provider: filled?.provider ?? "local",
			baseUrl: filled?.baseUrl,
			token,
			useSample
		} }),
		onSuccess: (res) => {
			setPreview(res.products);
			setSource(res.source);
			toast.success(res.source === "sample" ? "Loaded a sample Invoice Ninja catalog" : `Loaded ${res.products.length} remote products`);
		},
		onError: (e) => toast.error(e.message)
	});
	const importMut = useMutation({
		mutationFn: (useSample) => importRemoteCatalog({ data: {
			provider: filled?.provider ?? "local",
			baseUrl: filled?.baseUrl,
			token,
			useSample
		} }),
		onSuccess: (res) => {
			toast.success(res.note);
			qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	const pushMut = useMutation({
		mutationFn: (invoiceId) => pushInvoiceToApi({ data: {
			invoiceId,
			provider: filled.provider === "generic_rest" ? "generic_rest" : "invoice_ninja",
			baseUrl: filled.baseUrl,
			token
		} }),
		onSuccess: () => {
			toast.success("Invoice pushed to the invoicing API");
			qc.invalidateQueries({ queryKey: ["invoices"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const linkMut = useMutation({
		mutationFn: () => linkStaffIdentity({ data: { staffIdentifier: staffId } }),
		onSuccess: () => {
			toast.success("Staff identity linked");
			setStaffId("");
			qc.invalidateQueries({ queryKey: ["app-users"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!s || !filled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-xl bg-surface-2" });
	const myAccount = (accountsQ.data ?? []).find((a) => a.userId === user?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "School",
			title: "Link and settings",
			description: "Your staff account, campus identity, and the Invoice Ninja hook. Tokens stay in this session."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Staff account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Sign in with Google (Gmail), X, or school email. Link a TSC or national ID from the staff roll." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: user?.displayName ?? "Staff user"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: user?.primaryEmail ?? "No email on file"
								}),
								myAccount?.staffIdentifier ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-xs text-primary",
									children: [
										"Linked ",
										myAccount.staffName ?? myAccount.staffIdentifier,
										" · ",
										myAccount.staffIdentifier
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: "Not yet linked to a TSC or ID number"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Link TSC or ID number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: staffId,
								onValueChange: setStaffId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a staff record" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (staffQ.data ?? []).map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: member.identifier,
									children: [
										member.firstName,
										" ",
										member.lastName,
										" · ",
										member.identifier
									]
								}, member.identifier)) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: !staffId || linkMut.isPending,
							onClick: () => linkMut.mutate(),
							children: linkMut.isPending ? "Linking…" : "Link identity"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[480px] text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-left text-[11px] uppercase tracking-[0.12em] text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Staff key"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Last seen"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (accountsQ.data ?? []).map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/70",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: account.displayName ?? account.email ?? "Staff"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: account.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 capitalize",
										children: account.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 font-mono text-xs",
										children: account.staffIdentifier ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 text-xs text-muted",
										children: formatDate(account.lastSeenAt)
									})
								]
							}, account.userId)) })]
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Campus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Used on invoices and the sidebar." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "School name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							defaultValue: s.schoolName,
							onChange: (e) => setSchoolName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Campus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							defaultValue: s.campus,
							onChange: (e) => setCampus(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								defaultValue: s.currency,
								onChange: (e) => setCurrency(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Invoice prefix" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "font-mono",
								defaultValue: s.invoicePrefix,
								onChange: (e) => setPrefix(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => saveMut.mutate(),
						disabled: saveMut.isPending,
						children: saveMut.isPending ? "Saving…" : "Save campus"
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Invoicing API" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Invoice Ninja v5 inventory (`/api/v1/products`) or a generic REST catalog. Without a token, import the sample catalog." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Provider" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							defaultValue: s.apiProvider,
							onValueChange: (v) => setProvider(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "local",
									children: "Local ledger only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "invoice_ninja",
									children: "Invoice Ninja"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "generic_rest",
									children: "Generic REST inventory"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Base URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "https://invoicing.co",
							defaultValue: s.apiBaseUrl ?? "",
							onChange: (e) => setBaseUrl(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "API token (this session)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							value: token,
							onChange: (e) => setToken(e.target.value),
							placeholder: "Not stored"
						})]
					}),
					s.lastSyncNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Last sync ",
							s.lastSyncAt ? formatDate(s.lastSyncAt) : "",
							" — ",
							s.lastSyncNote
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => saveMut.mutate(),
								children: "Save connection"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => previewMut.mutate(false),
								disabled: previewMut.isPending,
								children: "Test pull"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => previewMut.mutate(true),
								disabled: previewMut.isPending,
								children: "Sample catalog"
							})
						]
					})
				]
			})] })]
		}),
		preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Remote catalog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: ["Source: ", source === "sample" ? "sample Invoice Ninja products" : source] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[520px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-left text-[11px] uppercase tracking-[0.12em] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "SKU"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "Cost"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: preview.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono text-xs",
								children: p.sku
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 tabular-nums",
								children: p.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 tabular-nums",
								children: p.unitCost
							})
						]
					}, p.externalId)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: () => importMut.mutate(source === "sample"),
				disabled: importMut.isPending,
				children: importMut.isPending ? "Importing…" : "Import into stores"
			})] })]
		}) : null,
		filled.provider !== "local" && token && filled.baseUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Push an invoice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Send a local invoice to the connected invoicing app." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-2",
				children: (invQ.data ?? []).slice(0, 6).map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: inv.invoiceNo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: inv.partyName
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						disabled: pushMut.isPending,
						onClick: () => pushMut.mutate(inv.id),
						children: "Push"
					})]
				}, inv.id))
			})]
		}) : null
	] });
}
//#endregion
export { SettingsPage as component };
