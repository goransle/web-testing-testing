/**
 * Shamefully copied from the Highcharts repo.
 */
export default function () {
	let div;
	if (!document.getElementById("container")) {
		div = document.createElement("div");
		div.setAttribute("id", "container");
		document.body.appendChild(div);
	}

	if (!document.getElementById("output")) {
		div = document.createElement("div");
		div.setAttribute("id", "output");
		document.body.appendChild(div);
	}
	const demoHTML = document.createElement("div");
	demoHTML.setAttribute("id", "demo-html");
	document.body.appendChild(demoHTML);

	Highcharts.useSerialIds(true);

	// Disable animation over all.
	Highcharts.setOptions({
		chart: {
			animation: false,
		},
		plotOptions: {
			series: {
				animation: false,
				kdNow: true,
				dataLabels: {
					defer: false,
				},
				states: {
					hover: {
						animation: false,
					},
					select: {
						animation: false,
					},
					inactive: {
						animation: false,
					},
					normal: {
						animation: false,
					},
				},
				label: {
					// Disable it to avoid diff. Consider enabling it in the future,
					// then it can be enabled in the clean-up commit right after a
					// release.
					enabled: false,
				},
			},
			// We cannot use it in plotOptions.series because treemap
			// has the same layout option: layoutAlgorithm.
			networkgraph: {
				layoutAlgorithm: {
					enableSimulation: false,
					maxIterations: 10,
				},
			},
			packedbubble: {
				layoutAlgorithm: {
					enableSimulation: false,
					maxIterations: 10,
				},
			},
		},
		// Stock's Toolbar decreases width of the chart. At the same time, some
		// tests have hardcoded x/y positions for events which cuases them to fail.
		// For these tests, let's disable stockTools.gui globally.
		stockTools: {
			gui: {
				enabled: false,
			},
		},
		tooltip: {
			animation: false,
		},
		drilldown: {
			animation: false,
		},
	});

	Highcharts.defaultOptionsRaw = JSON.stringify(Highcharts.defaultOptions);
	Highcharts.callbacksRaw = Highcharts.Chart.prototype.callbacks.slice(0);
}
