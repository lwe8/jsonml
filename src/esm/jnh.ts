import * as htmlparser2 from "htmlparser2";
import type { TagName } from "../types/tags.js";
import type {
	JMLAttributes,
	JMLElement,
	JMLNode,
	JMLNodes,
} from "../types/types.js";
import escapeHtml from "./escapeHtml.js";

// List of HTML void elements (self-closing, no content)
const VOID_TAGS = new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr",
]);

/**
 * Validates HTML string using htmlparser2 (throws on error).
 * @param html - HTML string to validate.
 */
export function vh(html: string): void {
	const parser = new htmlparser2.Parser({
		onerror(error) {
			throw error;
		},
	});
	parser.write(html);
	parser.end();
}

/**
 * Converts a JSONML array to an HTML string, handling void tags.
 * @param jsonml - The JSONML structure.
 * @returns HTML string.
 */
export function j2h(jsonml: JMLNode): string {
	if (typeof jsonml === "string") return escapeHtml(jsonml);
	if (!Array.isArray(jsonml) || typeof jsonml[0] !== "string") return "";
	const [tag, ...rest] = jsonml;
	let attrs = "";
	let children = rest;
	if (rest[0] && typeof rest[0] === "object" && !Array.isArray(rest[0])) {
		attrs = Object.entries(rest[0] as JMLAttributes)
			.map(([k, v]) => ` ${k}="${String(v).replace(/"/g, "&quot;")}"`)
			.join("");
		children = rest.slice(1);
	}
	if (VOID_TAGS.has(tag)) {
		return `<${tag}${attrs}>`;
	}
	// Filter out attribute objects from children
	const validChildren = children.filter(
		(child) => typeof child === "string" || Array.isArray(child),
	) as JMLNodes;
	const inner = validChildren.map(j2h).join("");
	return `<${tag}${attrs}>${inner}</${tag}>`;
}

/**
 * Converts an HTML string to a JSONML structure.
 * @param html - The HTML string to convert.
 * @returns The JSONML structure.
 */
export function h2j(html: string): JMLNodes {
	const stack: any[] = [];
	let current: any = null;
	const result: JMLNodes = [];

	const parser = new htmlparser2.Parser(
		{
			onopentag(name, attribs) {
				const el: JMLElement = [name as TagName];
				if (Object.keys(attribs).length > 0) {
					el.push(attribs);
				}
				if (current) {
					(current as JMLElement).push(el);
					stack.push(current);
				} else {
					result.push(el);
				}
				current = el;
			},
			ontext(text) {
				if (current) {
					(current as JMLElement).push(text);
				}
			},
			onclosetag() {
				if (stack.length > 0) {
					current = stack.pop();
				} else {
					current = null;
				}
			},
		},
		{ decodeEntities: true },
	);

	parser.write(html);
	parser.end();
	return result;
}
