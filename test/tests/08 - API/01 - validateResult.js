describe("API 01", function () {

	it("validateResult returns object with appropriate properties", function () {
		var data = {};
		var schema = {"type": "array"};
		tv5.error = null;
		tv5.missing = [];
		var result = tv5.validateResult(data, schema);

		assert.isFalse(result.valid, "result.valid === false");
		assert.isTypeOf(result.error, "object", "result.error is object");
		assert.isArray(result.missing, "result.missing is array");
		assert.isFalse(!!tv5.error, "tv5.error == null");

		//this.assert(result.valid === false, "result.valid === false");
		//this.assert(typeof result.error == "object", "result.error is object");
		//this.assert(Array.isArray(result.missing), "result.missing is array");
		//this.assert(tv5.error == null, "tv5.error == null");
	});
});
