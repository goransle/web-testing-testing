import { glob } from "glob";

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { parse } from "yaml";

import process from "node:process";

const hcTestFolder =
	process.argv[2] ?? "../../hs/highcharts/samples/unit-tests/highcharts/";

console.log(hcTestFolder);

const hcTestFiles = glob.sync(`${hcTestFolder}**/*.js`);

console.log(hcTestFiles);

const testScript = await readFile("test.mjs", "utf8");

function handleResource(resource) {
	let src = resource;

	if (resource.endsWith(".js")) {
		if (resource.includes("qunit")) {
			src = "https://code.jquery.com/qunit/qunit-2.20.1.js";
		}

		return `<script src="${src}"></script>`;
	}

	if (resource.endsWith(".css")) {
		if (resource.includes("qunit")) {
			src = "https://code.jquery.com/qunit/qunit-2.20.1.css";
		}

		return `<link rel="stylesheet" href="${src}">`;
	}
}

const template = (html, resources) => `<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    ${resources ? resources.map((r) => handleResource(r)).join("\n") : ""}
</head>
<body>
${html}

<script src="./demo.js"></script>

<script type="module" src="/test.mjs">
</script>
</body>
`;

const testRoot = "test/__generated__/";

await rm(testRoot, { recursive: true });
await mkdir(testRoot, { recursive: true });

for (const file of hcTestFiles) {
	const js = await readFile(file, "utf8");
	const html = await readFile(file.replace(".js", ".html"), "utf8").catch(
		() => null,
	);
	const details = await readFile(file.replace(".js", ".details"), "utf8").catch(
		() => null,
	);

	if (js.includes("TestController")) {
		continue;
	}

	if (html && details) {
		const detailsParsed = parse(details);

		if (!detailsParsed.resources) {
			detailsParsed.resources = [];
		}

		detailsParsed.resources.push("https://code.jquery.com/jquery-3.7.1.min.js");

		await mkdir(
			`${testRoot}${file
				.replace(hcTestFolder, "")
				.split("/")
				.slice(0, -1)
				.join("/")}`,
			{ recursive: true },
		);

		await writeFile(`${testRoot}${file.replace(hcTestFolder, "")}`, js);

		const testHTML = template(html, detailsParsed.resources);
		await writeFile(
			`${testRoot}${file
				.replace(hcTestFolder, "")
				.replace(".js", ".test.html")}`,
			testHTML,
		);
	}
}
