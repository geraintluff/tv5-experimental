describe("$ref 04", function () {

	it("addSchema(), $ref", function () {
		var url = "http://example.com/schema";
		var schema = {
			"test": "value"
		};
		tv5.addSchema(url, schema);

		var otherSchema = {
			"items": {"$ref": url}
		};
		var valid = tv5.validate([0,1,2,3], otherSchema);

		assert.isTrue(valid, "should be valid");
		assert.length(tv5.missing, 0, "should have no missing schemas");

		//this.assert(valid, "should be valid");
		//this.assert(tv5.missing.length == 0, "should have no missing schemas");
	});

	it("internal $ref", function () {
		var schema = {
			"type": "array",
			"items": {"$ref": "#"}
		};

		assert.isTrue(tv5.validate([[],[[]]], schema), "List of lists should be valid");
		assert.isTrue(!tv5.validate([0,1,2,3], schema), "List of ints should not");
		assert.isTrue(!tv5.validate([[true], []], schema), "List of list with boolean should not");

		assert.length(tv5.missing, 0, "should have no missing schemas");

		//this.assert(tv5.validate([[],[[]]], schema), "List of lists should be valid");
		//this.assert(!tv5.validate([0,1,2,3], schema), "List of ints should not");
		//this.assert(!tv5.validate([[true], []], schema), "List of list with boolean should not");

		//this.assert(tv5.missing.length == 0, "should have no missing schemas");
	});
});
