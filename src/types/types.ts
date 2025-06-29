import type { TagName } from "./tags.js";
export type JMLAttributes = {
	[key: string]:
		| string
		| number
		| boolean
		| Record<string, any>
		| Array<unknown>;
};
export type JMLElement = [TagName, ...(JMLAttributes | JMLElement | string)[]];
export type JMLNode = string | JMLElement;
export type JMLNodes = JMLNode[];
export interface JMLVisitor {
	visitElement: (node: JMLNode, index?: number, parent?: JMLNodes) => void;
	visitText: (node: string, index?: number, parent?: JMLNodes) => void;
}
