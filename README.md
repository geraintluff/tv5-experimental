# tv5-experimental

### Experimental Validator for *hypothetical* v5 JSON Schema features

This is a variant of the `tv4` JSON Schema validator.  It is intended as a playground to experiment with possible features for the next version of the draft, to provide a concrete example of how such features could work.

The features included in this package are **not guaranteed** to make it into the standard, and are highly likely to change.

## Currently supported features

* [`$data`](https://github.com/json-schema/json-schema/wiki/%24data-%28v5-proposal%29) - allow schemas to use values from the data, specified using Relative JSON Pointers

(`formatMinimum`/`formatMaximum` can actually already be used in `tv4` - basically, you can register a [custom validator] function for a particular format, and this can explore any other schema properties it likes.)