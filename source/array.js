ValidatorContext.prototype.validateArray = function validateArray(data, schema, dataContext) {
	if (!Array.isArray(data)) {
		return null;
	}
	return this.validateArrayLength(data, schema, dataContext)
		|| this.validateArrayUniqueItems(data, schema, dataContext)
		|| this.validateArrayItems(data, schema, dataContext)
		|| null;
};

ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema, dataContext) {
	var error;
	var minItems = dataContext.schemaValue(schema.minItems);
	var maxItems = dataContext.schemaValue(schema.maxItems);
	if (minItems !== undefined) {
		if (data.length < minItems) {
			error = (this.createError(ErrorCodes.ARRAY_LENGTH_SHORT, {length: data.length, minimum: minItems})).prefixWith(null, "minItems");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (maxItems !== undefined) {
		if (data.length > maxItems) {
			error = (this.createError(ErrorCodes.ARRAY_LENGTH_LONG, {length: data.length, maximum: maxItems})).prefixWith(null, "maxItems");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema, dataContext) {
	var uniqueItems = dataContext.schemaValue(schema.uniqueItems);
	if (uniqueItems) {
		for (var i = 0; i < data.length; i++) {
			for (var j = i + 1; j < data.length; j++) {
				if (recursiveCompare(data[i], data[j])) {
					var error = (this.createError(ErrorCodes.ARRAY_UNIQUE, {match1: i, match2: j})).prefixWith(null, "uniqueItems");
					if (this.handleError(error)) {
						return error;
					}
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema, dataContext) {
	if (schema.items === undefined) {
		return null;
	}
	var error, i;
	if (Array.isArray(schema.items)) {
		for (i = 0; i < data.length; i++) {
			if (i < schema.items.length) {
				if (error = this.validateAll(data[i], schema.items[i], [i], ["items", i], dataContext.add(i))) {
					return error;
				}
			} else if (schema.additionalItems !== undefined) {
				if (typeof schema.additionalItems === "boolean") {
					if (!schema.additionalItems) {
						error = (this.createError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, {})).prefixWith("" + i, "additionalItems");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (error = this.validateAll(data[i], schema.additionalItems, [i], ["additionalItems"], dataContext.add(i))) {
					return error;
				}
			}
		}
	} else {
		for (i = 0; i < data.length; i++) {
			if (error = this.validateAll(data[i], schema.items, [i], ["items"], dataContext.add(i))) {
				return error;
			}
		}
	}
	return null;
};
