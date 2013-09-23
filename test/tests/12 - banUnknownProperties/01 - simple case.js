describe("Registering custom validator", function () {
	it("Additional argument to ban additional properties", function () {
		var schema = {
			properties: {
				propA: {},
				propB: {}
			}
		};
		var data = {
			propA: true,
			propUnknown: true
		};
		var data2 = {
			propA: true
		};
		
		var result = tv5.validateMultiple(data, schema, false, true);
		assert.isFalse(result.valid, "Must not be valid");

		var result2 = tv5.validateMultiple(data2, schema, false, true);
		assert.isTrue(result2.valid, "Must still validate");
	});

	it("Do not complain if additionalArguments is specified", function () {
		var schema = {
			properties: {
				propA: {},
				propB: {}
			},
			additionalProperties: true
		};
		var data = {
			propA: true,
			propUnknown: true
		};
		var data2 = {
			propA: true
		};
		
		var result = tv5.validateMultiple(data, schema, false, true);
		console.log(result);
		assert.isTrue(result.valid, "Must be valid");

		var result2 = tv5.validateMultiple(data2, schema, false, true);
		console.log(result2);
		assert.isTrue(result2.valid, "Must still validate");
	});
});
