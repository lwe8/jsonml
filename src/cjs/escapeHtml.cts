function escapeHtml(text: string, escapeQuotes?: boolean) {
	return text
		.replace(
			/&(?!(#\d{2,}|#x[\da-fA-F]{2,}|[a-zA-Z][a-zA-Z1-4]{1,6});)/g,
			"&amp;",
		)
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, escapeQuotes ? "&quot;" : '"')
		.replace(/'/g, escapeQuotes ? "&#39;" : "'");
}

export = escapeHtml;
