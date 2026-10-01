import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-DwHd3J7F.mjs";
import { v as BookOpen } from "../_libs/lucide-react.mjs";
import { d as Button, w as useCurrentUserState } from "./router-BiuIvVP8.mjs";
import { t as Input } from "./input-BhBidv0w.mjs";
import { t as Label } from "./label-hV3RuN0B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-M-PViE_H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-4",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M6.6 14.3 5.5 15.1 3 17.1C4.7 20.5 8.1 22.8 12 22.8c2.7 0 4.9-.9 6.6-2.4l-3.1-2.4c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4A90E2",
				d: "M3 6.9C1.7 9.5 1.7 12.5 3 15.1l3.6-2.8C6 11.1 6 10.9 6 10.8c0-.1 0-.3.1-.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M12 5.2c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 1.9 14.7.8 12 .8 8.1.8 4.7 3.1 3 6.9l3.6 2.8C7 7 9.3 5.2 12 5.2z"
			})
		]
	});
}
function XMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-4",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M18.2 3H21l-6.5 7.4L22 21h-6.2l-4.4-5.8L6 21H3.2l7-8L2 3h6.3l4 5.3L18.2 3zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5z"
		})
	});
}
function Login() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function onProvider(providerId, key) {
		setError(null);
		setBusy(key);
		try {
			await signIn(providerId, {
				callbackURL: "/",
				errorCallbackURL: "/login"
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed");
			setBusy(null);
		}
	}
	async function onEmail(event) {
		event.preventDefault();
		setError(null);
		setBusy("email");
		try {
			if (mode === "up") {
				const { error: signUpError } = await authClient.signUp.email({
					name: name.trim() || email.split("@")[0],
					email: email.trim(),
					password,
					callbackURL: "/"
				});
				if (signUpError) throw new Error(signUpError.message ?? "Could not create the account");
			} else {
				const { error: signInError } = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: "/"
				});
				if (signInError) throw new Error(signInError.message ?? "Email or password is not recognised");
			}
			await authClient.getSession();
			window.location.href = "/";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not sign in");
			setBusy(null);
		}
	}
	const google = GROK_PROVIDERS.find((p) => p.idp === "google");
	const x = GROK_PROVIDERS.find((p) => p.idp === "twitter");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative hidden overflow-hidden bg-primary px-10 py-12 text-primary-fg lg:flex lg:flex-col lg:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 size-64 rounded-full bg-primary-fg/5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 left-10 size-72 rounded-full bg-primary-fg/5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-md bg-primary-fg/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
										className: "size-5",
										strokeWidth: 1.75
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl leading-none",
									children: "Arden Stores"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] uppercase tracking-[0.16em] text-primary-fg/70",
									children: "Ridge Campus"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-16 max-w-md font-display text-4xl font-medium leading-tight",
								children: "The campus ledger, for staff only."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm leading-relaxed text-primary-fg/80",
								children: "Sign in with school Gmail, X, or a staff email to open the student register, staff roll, stores, and invoices."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "relative grid max-w-md grid-cols-3 gap-6 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-[0.14em] text-primary-fg/60",
								children: "Students"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-lg",
								children: "Admission no."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-[0.14em] text-primary-fg/60",
								children: "Teachers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-lg",
								children: "TSC no."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-[0.14em] text-primary-fg/60",
								children: "Support"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-lg",
								children: "ID no."
							})] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex items-center justify-center px-4 py-10 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center gap-3 lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-md bg-primary text-primary-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
									className: "size-4",
									strokeWidth: 1.75
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-none",
								children: "Arden Stores"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] uppercase tracking-[0.14em] text-muted",
								children: "Staff sign-in"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-[11px] font-medium uppercase tracking-[0.16em] text-muted lg:block",
							children: "Staff access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-medium tracking-tight",
							children: "Sign in to the ledger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "School Gmail, Google Workspace, X, or a staff email and password."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid gap-2",
								children: [google ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									className: "h-12 justify-start gap-3 bg-surface text-base",
									disabled: busy !== null,
									onClick: () => onProvider(google.providerId, "google"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, {}), busy === "google" ? "Opening Google…" : "Continue with Google"]
								}) : null, x ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									className: "h-12 justify-start gap-3 bg-surface text-base",
									disabled: busy !== null,
									onClick: () => onProvider(x.providerId, "x"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMark, {}), busy === "x" ? "Opening X…" : "Continue with X"]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-subtle",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
									"or school email",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 grid grid-cols-2 rounded-md border border-border bg-surface-2 p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `h-10 rounded-sm text-sm font-medium ${mode === "in" ? "bg-surface text-fg shadow-soft" : "text-muted"}`,
									onClick: () => setMode("in"),
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `h-10 rounded-sm text-sm font-medium ${mode === "up" ? "bg-surface text-fg shadow-soft" : "text-muted"}`,
									onClick: () => setMode("up"),
									children: "Create account"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "grid gap-3",
								onSubmit: onEmail,
								children: [
									mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "staff-name",
											children: "Full name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "staff-name",
											autoComplete: "name",
											value: name,
											onChange: (e) => setName(e.target.value),
											placeholder: "e.g. Jane Wanjiku"
										})]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "staff-email",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "staff-email",
											type: "email",
											required: true,
											autoComplete: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "you@arden.ac.ke"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "staff-password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "staff-password",
											type: "password",
											required: true,
											minLength: 8,
											autoComplete: mode === "up" ? "new-password" : "current-password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "At least 8 characters"
										})]
									}),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rounded-md bg-danger-bg px-3 py-2 text-sm text-danger",
										role: "alert",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "mt-1 h-12",
										disabled: busy !== null,
										children: busy === "email" ? mode === "up" ? "Creating account…" : "Signing in…" : mode === "up" ? "Create staff account" : "Sign in with email"
									})
								]
							})
						] })
					]
				})
			})]
		})
	});
}
//#endregion
export { Login as component };
