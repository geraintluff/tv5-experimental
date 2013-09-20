describe("Use $data for minimum/maximum", function () {
	it("A <= B <= C", function () {
		var schema = {
			type: "object",
			properties: {
				"A": {"type": "number"},
				"B": {
					type: "number",
					minimum: {"$data": "1/A"},
					maximum: {"$data": "1/C"}
				},
				"C": {"type": "number"}
			}
		};
		
		var data1 = {A: 0, B: 1, C:2};
		var result1 = tv5.validateMultiple(data1, schema);
		assert.isTrue(result1.valid, "data1 should be valid");

		var data2 = {A: 0, B: -1, C:2};
		var result2 = tv5.validateMultiple(data2, schema);
		assert.isFalse(result2.valid, "data2 should be invalid");

		var data3 = {A: 0, B: 4, C:2};
		var result3 = tv5.validateMultiple(data3, schema);
		assert.isFalse(result3.valid, "data3 should be invalid");
	});
});
