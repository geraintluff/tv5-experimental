describe("Registering custom validator", function () {
	it("Allows registration of custom validator codes for \"format\" values", function () {
		tv5.addFormat('test-format', function () {
			return null;
		});
	});

	it("Custom validator is correctly selected", function () {
		tv5.addFormat('test-format', function (data) {
			if (data !== "test string") {
				return "string does not match";
			}
		});
		
		var schema = {format: 'test-format'};
		var data1 = "test string";
		var data2 = "other string";
		
		assert.isTrue(tv5.validate(data1, schema));
		assert.isFalse(tv5.validate(data2, schema));
		assert.includes(tv5.error.message, 'string does not match');
	});

	it("Custom validator object error format", function () {
		tv5.addFormat('test-format', function (data) {
			if (data !== "test string") {
				return {
					dataPath: "",
					schemaPath: "/flah",
					message: "Error message"
				};
			}
		});
		
		var schema = {format: 'test-format'};
		var data1 = "test string";
		var data2 = "other string";
		
		assert.isTrue(tv5.validate(data1, schema));
		assert.isFalse(tv5.validate(data2, schema));
		assert.includes(tv5.error.message, 'Error message');
		assert.equal(tv5.error.schemaPath, '/flah');
	});

	it("Register multiple using object", function () {
		tv5.addFormat({
			'test1': function () {return 'break 1';},
			'test2': function () {return 'break 2';}
		});
		
		var schema1 = {format: 'test1'};
		var result1 = tv5.validateResult("test string", schema1);
		assert.isFalse(result1.valid);
		assert.includes(result1.error.message, 'break 1');

		var schema2 = {format: 'test2'};
		var result2 = tv5.validateResult("test string", schema2);
		assert.isFalse(result2.valid);
		assert.includes(result2.error.message, 'break 2');
	});
});
