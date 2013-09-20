describe("Use $data for minLength/maxLength", function () {
	it("string.length < stringLength", function () {
		var schema = {
			type: "object",
			properties: {
				"stringLength": {"type": "integer", "minimum": 0},
				"string": {
					type: "string",
					maxLength: {"$data": "1/stringLength"}
				}
			}
		};
		
		var data1 = {stringLength: 2, string: ":)"};
		var result1 = tv5.validateMultiple(data1, schema);
		assert.isTrue(result1.valid, "data1 should be valid");

		var data2 = {stringLength: 0, string: "Oh no!"};
		var result2 = tv5.validateMultiple(data2, schema);
		assert.isFalse(result2.valid, "data2 should be invalid");

		var data3 = {string: "blah", "stringLength": null};
		var result3 = tv5.validateMultiple(data3, schema);
		assert.isFalse(result3.valid, "data3 should be invalid, but no error thrown");
	});
});
