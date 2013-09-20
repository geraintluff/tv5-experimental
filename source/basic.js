ValidatorContext.prototype.validateBasic = function validateBasic(data, schema, dataContext) {
	var error;
	if (error = this.validateType(data, schema, dataContext)) {
		return error.prefixWith(null, "type");
	}
	if (error = this.validateEnum(data, schema, dataContext)) {
		return error.prefixWith(null, "type");
	}
	return null;
};

ValidatorContext.prototype.validateType = function validateType(data, schema, dataContext) {
	var allowedTypes = dataContext.schemaValue(schema.type);
	if (allowedTypes === undefined) {
		return null;
	}
	var dataType = typeof data;
	if (data === null) {
		dataType = "null";
	} else if (Array.isArray(data)) {
		dataType = "array";
	}
	if (typeof allowedTypes !== "object") {
		allowedTypes = [allowedTypes];
	}

	for (var i = 0; i < allowedTypes.length; i++) {
		var type = allowedTypes[i];
		if (type === dataType || (type === "integer" && dataType === "number" && (data % 1 === 0))) {
			return null;
		}
	}
	return this.createError(ErrorCodes.INVALID_TYPE, {type: dataType, expected: allowedTypes.join("/")});
};

ValidatorContext.prototype.validateEnum = function validateEnum(data, schema, dataContext) {
	var enumValues = dataContext.schemaValue(schema['enum']);
	if (enumValues === undefined) {
		return null;
	}
	for (var i = 0; i < enumValues.length; i++) {
		var enumVal = enumValues[i];
		if (recursiveCompare(data, enumVal)) {
			return null;
		}
	}
	return this.createError(ErrorCodes.ENUM_MISMATCH, {value: (typeof JSON !== 'undefined') ? JSON.stringify(data) : data});
};
