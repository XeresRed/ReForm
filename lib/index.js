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
import { ValidationRules, Validators } from './models/Validators.models';
var initConfig = {
    error: { intialize: false, default: false },
    customClass: { success: "", error: "" },
};
export var useForm = function (InitialState, config) {
    if (config === void 0) { config = initConfig; }
    var _a = React.useState(InitialState), values = _a[0], setValues = _a[1];
    var _b = React.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = React.useState(ValidationRules), validationRules = _c[0], SetValidationRules = _c[1];
    React.useEffect(function () {
        var _a;
        if (config && ((_a = config.error) === null || _a === void 0 ? void 0 : _a.intialize)) {
            var initErrors_1 = {};
            Object.keys(values).forEach(function (key) {
                var _a, _b;
                var _c, _d;
                var field = values[key];
                for (var _i = 0, _e = field.validators; _i < _e.length; _i++) {
                    var validator = _e[_i];
                    if (key in initErrors_1) {
                        initErrors_1[key] = __assign(__assign({}, initErrors_1[key]), (_a = {}, _a[validator.type] = (_c = config.error) === null || _c === void 0 ? void 0 : _c.default, _a));
                    }
                    else {
                        initErrors_1[key] = (_b = {},
                            _b[validator.type] = (_d = config.error) === null || _d === void 0 ? void 0 : _d.default,
                            _b);
                    }
                }
            });
        }
    }, []);
    var ValidateInput = function (id, value) {
        var _a, _b, _c;
        var _d, _e;
        var field = values[id];
        var flagError = [];
        var resultErrors = {};
        for (var _i = 0, _f = field.validators; _i < _f.length; _i++) {
            var validator = _f[_i];
            if (validator.extras) {
                if (validator.extras.bindField && validator.extras.bindField.activate) {
                    try {
                        validator.data = values[validator.extras.bindField.field].value;
                    }
                    catch (error) {
                        setErrors(__assign(__assign({}, errors), (_a = {}, _a[id] = __assign(__assign({}, errors[id]), { Exception: error }), _a)));
                        return;
                    }
                }
            }
            var validation = validationRules[validator.type](value, validator);
            if (validation[validator.type]) {
                flagError.push(false);
            }
            resultErrors = __assign(__assign({}, resultErrors), (_b = {}, _b[id] = __assign(__assign({}, resultErrors[id]), validation), _b));
        }
        setErrors(__assign(__assign({}, errors), resultErrors));
        setValues(__assign(__assign({}, values), (_c = {}, _c[id] = {
            validators: values[id].validators,
            value: value,
            class: flagError.length === 0 ? (_d = config.customClass) === null || _d === void 0 ? void 0 : _d.success : (_e = config.customClass) === null || _e === void 0 ? void 0 : _e.error,
            hasErrors: !(flagError.length === 0)
        }, _c)));
    };
    var addValidationRules = function (newRules) {
        SetValidationRules(__assign(__assign({}, validationRules), newRules));
    };
    var setValidators = function (formField, validator) {
        var _a;
        if (!(formField in values))
            return false;
        var val = __assign({}, values[formField]);
        val.validators = validator;
        setValues(__assign(__assign({}, values), (_a = {}, _a[formField] = val, _a)));
        return true;
    };
    var ValidateSubmit = function () {
        var _a, _b;
        for (var _i = 0, _c = Object.keys(values); _i < _c.length; _i++) {
            var keyValue = _c[_i];
            var field = values[keyValue];
            for (var _d = 0, _e = field.validators; _d < _e.length; _d++) {
                var validator = _e[_d];
                var validation = validationRules[validator.type](field.value, validator);
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
        validationRules: validationRules,
        addValidationRules: addValidationRules,
        setValidators: setValidators
    };
};
export var defaultValidators = Validators;
