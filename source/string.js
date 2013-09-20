ValidatorContext.prototype.validateString = function validateString(data, schema, dataContext) {
	return this.validateStringLength(data, schema, dataContext)
		|| this.validateStringPattern(data, schema, dataContext)
		|| null;
};

ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema, dataContext) {
	if (typeof data !== "string") {
		return null;
	}
	var minLength = dataContext.schemaValue(schema.minLength);
	var maxLength = dataContext.schemaValue(schema.maxLength);
	if (minLength !== undefined) {
		if (data.length < minLength) {
			return this.createError(ErrorCodes.STRING_LENGTH_SHORT, {length: data.length, minimum: minLength}).prefixWith(null, "minLength");
		}
	}
	if (maxLength !== undefined) {
		if (data.length > maxLength) {
			return this.createError(ErrorCodes.STRING_LENGTH_LONG, {length: data.length, maximum: maxLength}).prefixWith(null, "maxLength");
		}
	}
	return null;
};

ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema, dataContext) {
	if (typeof data !== "string" || schema.pattern === undefined) {
		return null;
	}
	var pattern = dataContext.schemaValue(schema.pattern);
	var regexp = new RegExp(pattern);
	if (!regexp.test(data)) {
		return this.createError(ErrorCodes.STRING_PATTERN, {pattern: pattern}).prefixWith(null, "pattern");
	}
	return null;
};