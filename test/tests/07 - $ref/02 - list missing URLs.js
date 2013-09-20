describe("$ref 02", function () {

	it("skip unneeded", function () {
		var schema = {
			"items": {"$ref": "http://example.com/schema#"}
		};
		tv5.validate([], schema);
		assert.notProperty(tv5.missing, "http://example.com/schema");
		assert.length(tv5.missing, 0);
		//return !tv5.missing["http://example.com/schema"]
		//	&& tv5.missing.length == 0;
	});

	it("list missing (map)", function () {
		var schema = {
			"items": {"$ref": "http://example.com/schema#"}
		};
		tv5.validate([1, 2, 3], schema);
		assert.property(tv5.missing, "http://example.com/schema");
		//return !!tv5.missing["http://example.com/schema"];
	});

	it("list missing (index)", function () {
		var schema = {
			"items": {"$ref": "http://example.com/schema#"}
		};
		tv5.validate([1, 2, 3], schema);
		assert.length(tv5.missing, 1);
		assert.strictEqual(tv5.missing[0], "http://example.com/schema");
		//return tv5.missing[0] == "http://example.com/schema";
	});
});