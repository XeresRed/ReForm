var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React from 'react';
import { ValidationRules } from './models/Validators.models';
export var useForm = function (InitialState) {
    var _a = React.useState(InitialState), values = _a[0], setValues = _a[1];
    var _b = React.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = React.useState(ValidationRules), validators = _c[0], SetValidators = _c[1];
    var ValidateInput = function (event) {
        var _a, _b, _c;
        var field = values[event.target.name];
        var flagError = [];
        for (var _i = 0, _d = field.validators; _i < _d.length; _i++) {
            var validator = _d[_i];
            var validation = validators[validator.type](event.target.value, validator);
            if (validation) {
                flagError.push(false);
                setErrors(__assign(__assign({}, errors), (_a = {}, _a[event.target.name] = __spreadArray(__spreadArray([], errors[event.target.name]), [validation]), _a)));
            }
            else {
                setErrors(__assign(__assign({}, errors), (_b = {}, _b[event.target.name] = [], _b)));
            }
        }
        setValues(__assign(__assign({}, values), (_c = {}, _c[event.target.name] = {
            validators: values[event.target.name].validators,
            value: event.target.value,
            class: flagError.length === 0 ? 'success' : 'error'
        }, _c)));
    };
    var addValidationRules = function (newRules) {
        SetValidators(__assign(__assign({}, validators), newRules));
    };
    var ValidateSubmit = function () {
        var _a, _b;
        for (var _i = 0, _c = Object.keys(values); _i < _c.length; _i++) {
            var keyValue = _c[_i];
            var field = values[keyValue];
            for (var _d = 0, _e = field.validators; _d < _e.length; _d++) {
                var validator = _e[_d];
                var validation = validators[validator.type](field.value, validator);
                if (validation) {
                    setErrors(__assign(__assign({}, errors), (_a = {}, _a[keyValue] = __spreadArray(__spreadArray([], errors[keyValue]), [validation]), _a)));
                }
                else {
                    setErrors(__assign(__assign({}, errors), (_b = {}, _b[keyValue] = [], _b)));
                }
            }
        }
    };
    return {
        values: values,
        errors: errors,
        ValidateInput: ValidateInput,
        ValidateSubmit: ValidateSubmit,
        SetValidators: SetValidators,
        addValidationRules: addValidationRules
    };
};
