describe("$ref 03", function () {

	it("addSchema(), getSchema()", function () {
		var url = "http://example.com/schema";
		var schema = {
			"test": "value"
		};
		tv5.addSchema(url, schema);
		var fetched = tv5.getSchema(url);
		assert.strictEqual(fetched.test, "value");
		//return fetched.test == "value";
	});

	it("addSchema(), getSchema() with blank fragment", function () {
		var url = "http://example.com/schema";
		var schema = {
			"test": "value"
		};
		tv5.addSchema(url, schema);
		var fetched = tv5.getSchema(url + "#");
		assert.strictEqual(fetched.test, "value");
		//return fetched.test == "value";
	});

	it("addSchema(), getSchema() with pointer path fragment", function () {
		var url = "http://example.com/schema";
		var schema = {
			"items": {
				"properties": {
					"key[]": {
						"inner/key~": "value"
					}
				}
			}
		};
		tv5.addSchema(url, schema);
		var fetched = tv5.getSchema(url + "#/items/properties/key%5B%5D/inner~1key~0");
		assert.strictEqual(fetched, "value");
		//return fetched == "value";
	});

	it("addSchema(), getSchema() adds referred schemas", function () {
		tv5 = tv5.freshApi();

		var data = [123, true];
		var valid;
		var url = "http://example.com/schema";
		var schema = {
			"type": "array",
			"items": {"$ref": "http://example.com/schema/sub#item"}
		};
		tv5.addSchema(url, schema);

		//test missing
		valid = tv5.validate(data, schema);
		assert.isTrue(valid);
		assert.length(tv5.missing, 1);
		assert.isUndefined(tv5.getSchema('http://example.com/schema/sub'));

		var item = {
			"id": "#item",
			"type": "boolean"
		};
		var sub = {
			"id": "http://example.com/schema/sub",
			"type": "object",
			"lib": {
				"item": item
			}
		};
		tv5.addSchema(sub);

		//added it?
		assert.equal(tv5.getSchema(url), schema);
		assert.equal(tv5.getSchema('http://example.com/schema/sub'), sub);
		assert.equal(tv5.getSchema('http://example.com/schema/sub#item'), item);

		//now use it
		valid = tv5.validate(data, schema);
		assert.length(tv5.missing, 0);
		assert.isFalse(valid);

		var error = {
			code: 0,
			message: 'invalid type: number (expected boolean)',
			dataPath: '/0',
			schemaPath: '/items/type',
			subErrors: null };
		assert.deepEqual(tv5.error, error);
	});
});