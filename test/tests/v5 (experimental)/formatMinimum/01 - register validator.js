describe("Registering custom validator", function () {
	it("Custom validator is passed a schema", function () {
		tv5.addFormat('test-format', function (data, schema) {
			if (!schema) {
				throw new Error("schema not provided");
			}
			return null;
		});
		
		var schema = {format: 'test-format'};
		var data1 = "test string";
		
		tv5.validate(data1, schema);
	});

	it("Custom validator can access formatMinimum", function () {
		tv5.addFormat('test-format', function (data, schema) {
			if (schema.formatMinimum !== undefined) {
				if (data < schema.formatMinimum) {
					return {
						dataPath: "",
						schemaPath: "/formatMinimum",
						message: "data is less than format minimum"
					};
				}
				// Ignore all other format* keywords, because we're allowed to.
			}
			return null;
		});
		
		var schema = {format: 'test-format', formatMinimum: 10};
		var data1 = 15;
		var data2 = 5;
		
		assert.isTrue(tv5.validate(data1, schema));
		assert.isFalse(tv5.validate(data2, schema));
		assert.includes(tv5.error.message, 'data is less than format minimum');
		assert.equal(tv5.error.schemaPath, '/formatMinimum');
	});
});
