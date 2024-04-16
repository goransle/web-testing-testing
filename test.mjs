import {
	sessionStarted,
	sessionFinished,
	sessionFailed,
} from "@web/test-runner-core/browser/session.js";

import setupQUnit from "/setupQUnit.mjs";
import setupHC from "/setupHC.mjs";

try {
	sessionStarted();

	setupHC(Highcharts);

	if (window.QUnit) {
		setupQUnit(QUnit);

		const testDetails = await new Promise((resolve) => {
			QUnit.on("runEnd", (details) => {
				if (details.status !== "passed") {
					console.log(details);
				}

				resolve(details);
			});
		});

		sessionFinished({
			passed: testDetails.status === "passed",
			testResults: {
				name: testDetails.fullName,
				suites: [],
				tests: testDetails.tests.map((test) => ({
					name: test.name,
					passed: test.status === "passed",
					skipped: test.status === "skipped",
					error: test.errors.join(", "),
					duration: test.runtime,
				})),
			},
		});
	} else {
		sessionFailed("QUnit not found");
	}
} catch (e) {
	sessionFailed(e);
}
