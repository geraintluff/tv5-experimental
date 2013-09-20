"use strict";

//need to declare these for node and modern browsers
var tv5;
var assert;

if (typeof process === 'object' && typeof process.cwd !== 'undefined') {
	// NodeJS
	tv5 = require('./../').tv5;
	assert = require('proclaim');
	require('source-map-support').install();

	var fs = require('fs');
	var getJSON = function (file) {
		var json;
		try {
			json = JSON.parse(fs.readFileSync(file, 'utf8'));
		}
		catch (e) {
			assert.fail(e, null, file + ': ' + String(e), 'getJSON');
		}
		assert.isObject(json, file);
		return json;
	};
	assert.isFile = function(file, msg) {
		if (!fs.existsSync(file)){
			assert.fail(false, true, msg + ': missing file ' + file, 'existsSync');
		}
	};

	describe('Verify package definition files', function (){
		var pkg;
		var component;
		var bower;
		it('pkg', function () {
			pkg = getJSON('./package.json');

			assert.property(pkg, 'main', 'main');
			assert.isFile(pkg.main, 'main');
		});
		it('component', function () {
			component = getJSON('./component.json');

			assert.property(component, 'main', 'main');
			assert.isFile(component.main, 'main');

			component.scripts.forEach(function(name) {
				assert.isFile(name, 'scripts');
			});
		});
		it('bower', function () {
			bower = getJSON('./bower.json');

			assert.property(bower, 'main', 'main');
			assert.isFile(bower.main, 'main');

			// should verify ignore field
		});
	});
}
else if (typeof window !== 'undefined') {
	// import for browser, use from IE7/8 global bypass
	assert = window.refs.assert;
	tv5 = window.refs.tv5;
}

//check if we got everything
if (!tv5) {
	throw new Error('tv5 not found');
}
if (!assert) {
	throw new Error('proclaim not found');
}
var helper = {};
helper.dumpJSON = function (value) {
	console.log(JSON.stringify(value, null, 2));
};


beforeEach(function () {
	tv5 = tv5.freshApi();
});


//duck patch standard assert to chai
//quick-and-dirty wrappers
assert.property = function (object, property, message) {
	if (typeof object[property] === 'undefined') {
		assert.fail(object, property, message, 'have property');
	}
};
assert.notProperty = function (object, property, message) {
	if (typeof object[property] !== 'undefined') {
		assert.fail(object, property, message, 'not have property');
	}
};

assert.ownProperty = function (object, property, message) {
	if (!object.hasOwnProperty(property)) {
		assert.fail(object, property, message, 'have own property');
	}
};
assert.notOwnProperty = function (object, property, message) {
	if (object.hasOwnProperty(property)) {
		assert.fail(object, property, message, 'not have own property');
	}
};

//not ideal at all
assert.propertyVal = function (object, property, value, message) {
	assert.property(object, property, message);
	assert.strictEqual(object[property], value, message);
};
assert.propertyNotVal = function (object, property, value, message) {
	assert.property(object, property, message);
	assert.notStrictEqual(object[property], value, message);
};
assert.ownPropertyVal = function (object, property, value, message) {
	assert.ownProperty(object, property, message);
	assert.strictEqual(object[property], value, message);
};
assert.notOwnPropertyVal = function (object, property, value, message) {
	assert.notOwnProperty(object, property, message);
	assert.notStrictEqual(object[property], value, message);
};
//import when fix is pushed
assert.notOk = function (value, message) {
	if (!!value) {
		assert.fail(value, true, message, '!=');
	}
};

/* jshint -W060 */

//end of header.js
