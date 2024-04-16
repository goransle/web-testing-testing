// import the browser launcher you want to use, chromeLauncher is the default
// import { chromeLauncher } from '@web/test-runner';
import { playwrightLauncher } from "@web/test-runner-playwright";
// import { puppeteerLauncher } from '@web/test-runner-puppeteer';
// import { seleniumLauncher } from '@web/test-runner-selenium';
// import { wdioLauncher } from '@web/test-runner-webdriver';
// import { browserstackLauncher } from '@web/test-runner-browserstack';

export default {
	browsers: [
		playwrightLauncher({ product: "chromium" }),
		playwrightLauncher({ product: "firefox" }),
	],
};
