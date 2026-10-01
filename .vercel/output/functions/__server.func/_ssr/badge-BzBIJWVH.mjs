import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { v as cn } from "./router-BiuIvVP8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BzBIJWVH.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "border-transparent bg-primary/10 text-primary",
		muted: "border-transparent bg-surface-2 text-muted",
		ok: "border-transparent bg-ok-bg text-ok",
		warn: "border-transparent bg-warn-bg text-warn",
		danger: "border-transparent bg-danger-bg text-danger",
		outline: "border-border text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
