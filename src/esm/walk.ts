import type { JMLNode, JMLNodes, JMLVisitor } from "../types/types.js";
import elements from "./elements.js";

const is_element = (node: JMLNode) =>
	Array.isArray(node) && elements.includes(node[0]);
const has_child = (node: JMLNodes) =>
	Array.isArray(node) && node.some(is_element);

export default function walkML(tree: JMLNodes, visitor: JMLVisitor) {
	const travis = (node: JMLNode) => {
		const idx = tree.indexOf(node);
		if (typeof node === "string" && visitor.visitText) {
			visitor.visitText(node, idx, tree);
		}
		if (
			typeof node !== "string" &&
			Array.isArray(node) &&
			is_element(node) &&
			visitor.visitElement
		) {
			visitor.visitElement(node, idx, tree);
			if (has_child(node as JMLNodes)) {
				const childs = node.filter((n) => is_element(n as JMLNode));
				childs.forEach((child) => {
					const _idx = childs.indexOf(child);
					if (visitor.visitElement) {
						visitor.visitElement(child as JMLNode, _idx, childs as JMLNodes);
					}
				});
			}
		}
	};
	tree.forEach(travis);
}
