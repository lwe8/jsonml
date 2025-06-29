import { h2j, j2h, vh } from "./esm/jnh.js";
import walkML from "./esm/walk.js";
import type { TagName } from "./types/tags.js";
import type {
	JMLAttributes,
	JMLElement,
	JMLNode,
	JMLNodes,
	JMLVisitor,
} from "./types/types.js";

const jsonml = {
	validateHtml: vh,
	html2ml: h2j,
	ml2html: j2h,
	walk: walkML,
};

export type {
	JMLNodes,
	JMLAttributes,
	JMLNode,
	JMLElement,
	JMLVisitor,
	TagName,
};

export default jsonml;
