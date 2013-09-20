describe("Core 02", function () {

	it("tv5.freshApi() produces working copy", function () {
		var duplicate = tv5.freshApi();
		assert.isObject(duplicate);
		// Basic sanity checks
		assert.isTrue(duplicate.validate({}, {type: "object"}));
		assert.isObject(duplicate.validateMultiple("string", {}));
	});

	it("tv5.freshApi() has separate schema store", function () {
		var duplicate = tv5.freshApi();
		
		var schemaUrl1 = "http://example.com/schema/schema1";
		var schemaUrl2 = "http://example.com/schema/schema2";
		duplicate.addSchema(schemaUrl1, {});
		tv5.addSchema(schemaUrl2, {});
		
		assert.isObject(duplicate.getSchema(schemaUrl1));
		assert.isUndefined(tv5.getSchema(schemaUrl1));
		assert.isUndefined(duplicate.getSchema(schemaUrl2));
		assert.isObject(tv5.getSchema(schemaUrl2));
	});
});
