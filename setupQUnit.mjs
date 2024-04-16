export default function (QUnit) {
	// Fix the number localization in IE
	if (/msie/.test(navigator.userAgent) && !Number.prototype._toString) {
		Number.prototype._toString = Number.prototype.toString;
		Number.prototype.toString = function (radix) {
			if (radix) {
				return Number.prototype._toString.apply(this, arguments);
			} else {
				return this.toLocaleString("en", {
					useGrouping: false,
					maximumFractionDigits: 20,
				});
			}
		};
	}

	QUnit.assert.close = function (number, expected, error, message) {
		// Remove fix of number localization in IE
		if (/msie/.test(navigator.userAgent) && Number.prototype._toString) {
			Number.prototype.toString = Number.prototype._toString;
			delete Number.prototype._toString;
		}

		if (error === void 0 || error === null) {
			error = 0.00001; // default error
		}

		var result =
			number === expected ||
			(number <= expected + error && number >= expected - error) ||
			false;

		this.pushResult({
			result: result,
			actual: number,
			expected: expected,
			message: message,
		});
	};
}
