describe("Recursive objects 01", function () {
	it("validate and variants do not choke on recursive objects", function () {
		var itemA = {};
		var itemB = { a: itemA };
		itemA.b = itemB;
		var aSchema = { properties: { b: { $ref: 'bSchema' }}};
		var bSchema = { properties: { a: { $ref: 'aSchema' }}};
		tv5.addSchema('aSchema', aSchema);
		tv5.addSchema('bSchema', bSchema);
		tv5.validate(itemA, aSchema, true);
		tv5.validate(itemA, aSchema, function () {}, true);
		tv5.validateResult(itemA, aSchema, true);
		tv5.validateMultiple(itemA, aSchema, true);
	});
});
