describe("Core 03", function () {

	it("tv5.dropSchemas() drops stored schemas", function () {
		var schema = {
			"items": {"$ref": "http://example.com/schema/items#"},
			"maxItems": 2
		};
		tv5.addSchema("http://example.com/schema", schema);
		assert.strictEqual(tv5.getSchema("http://example.com/schema"), schema, "has schema");

		tv5.dropSchemas();
		assert.isUndefined(tv5.getSchema("http://example.com/schema"), "doesn't have schema");
	});

	it("tv5.reset() clears errors, valid and missing", function () {
		it("must be string, is integer", function () {
			var data = 5;
			var schema = {"type": "array", "items" : {"$ref" : "http://example.com"}};

			assert.notOk(tv5.error, "starts with no error");
			assert.isTrue(tv5.valid, "starts valid");
			assert.length(tv5.missing, 0, "starts with 0 missing");

			var valid = tv5.validate(data, schema);
			assert.isFalse(valid);
			assert.ok(tv5.error, "has error");
			assert.isFalse(tv5.valid, "is invalid");
			assert.length(tv5.missing, 1, "missing 1");

			tv5.reset();
			assert.notOk(tv5.error, "reset to no error");
			assert.isTrue(tv5.valid, "reset to valid");
			assert.length(tv5.missing, 0, "reset to 0 missing");
		});
	});
});
