A setup for running Highcharts tests via the [Modern Web test-runner](https://modern-web.dev/docs/test-runner/overview/)

Currently testing is a two-step process:

1. build the test files with `node gentests <path to highcharts unit-tests>`.
(This will create a `test` directory with the test files)
2. run the tests with `npm test`

Previewing

Run `npx web-dev-server --node-resolve --open --watch`, and navigate to the test in question, i.e.
`http://localhost:8000/test/__generated__/3d/axis/demo.test.html`
