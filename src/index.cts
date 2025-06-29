import jnh = require("./cjs/jnh.cjs");
import walkML = require("./cjs/walk.cjs");

const jsonml = {
	validateHtml: jnh.vh,
	html2ml: jnh.h2j,
	ml2html: jnh.j2h,
	walk: walkML,
};

export = jsonml;
