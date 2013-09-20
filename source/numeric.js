ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema, dataContext) {
	return this.validateMultipleOf(data, schema, dataContext)
		|| this.validateMinMax(data, schema, dataContext)
		|| null;
};

ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema, dataContext) {
	var multipleOf = dataContext.schemaValue(schema.multipleOf || schema.divisibleBy);
	if (multipleOf === undefined) {
		return null;
	}
	if (typeof data === "number") {
		if (data % multipleOf !== 0) {
			return this.createError(ErrorCodes.NUMBER_MULTIPLE_OF, {value: data, multipleOf: multipleOf});
		}
	}
	return null;
};

ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema, dataContext) {
	if (typeof data !== "number") {
		return null;
	}
	var minimum = dataContext.schemaValue(schema.minimum);
	var maximum = dataContext.schemaValue(schema.maximum);
	if (minimum !== undefined) {
		if (data < minimum) {
			return this.createError(ErrorCodes.NUMBER_MINIMUM, {value: data, minimum: minimum}).prefixWith(null, "minimum");
		}
		if (schema.exclusiveMinimum && data === minimum) {
			return this.createError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, {value: data, minimum: minimum}).prefixWith(null, "exclusiveMinimum");
		}
	}
	if (maximum !== undefined) {
		if (data > maximum) {
			return this.createError(ErrorCodes.NUMBER_MAXIMUM, {value: data, maximum: maximum}).prefixWith(null, "maximum");
		}
		if (schema.exclusiveMaximum && data === maximum) {
			return this.createError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, {value: data, maximum: maximum}).prefixWith(null, "exclusiveMaximum");
		}
	}
	return null;
};
