;
export var Validators = {
    Required: function () { return ({ type: "required", data: null }); },
    Email: function (regex) {
        if (regex === void 0) { regex = null; }
        return ({ type: 'email', data: regex });
    },
    MinLength: function (length) { return ({ type: 'minLength', data: length }); },
    MaxLength: function (length) { return ({ type: 'maxLength', data: length }); },
    Min: function (length) { return ({ type: 'min', data: length }); },
    Max: function (length) { return ({ type: 'max', data: length }); }
};
export var ValidationRules = {
    email: function (value, validator) {
        var result;
        if (validator && validator.data) {
            result = value.match(validator.data);
            return !!result ? { email: false } : { email: true };
        }
        else {
            result = value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            return !!result ? { email: false } : { email: true };
        }
    },
    required: function (value) {
        if (value === null || value === undefined)
            return { required: true };
        else if (typeof value === 'string')
            return { required: value === '' || value.length === 0 };
        else if (typeof value === 'number')
            return { required: isNaN(value) };
        return { required: false };
    },
    max: function (value, validator) {
        if (isNaN(value))
            return { max: true };
        value = Number(value);
        return { max: !(value <= validator.data) };
    },
    min: function (value, validator) {
        if (isNaN(value))
            return { min: true };
        value = Number(value);
        return { min: !(value >= validator.data) };
    },
    maxLength: function (value, validator) {
        var result = 0;
        if (typeof value === 'string' || Array.isArray(value))
            result = value.length;
        else
            result = Object.keys(value).length;
        return { maxLength: !(result <= validator.data) };
    },
    minLength: function (value, validator) {
        var result = 0;
        if (typeof value === 'string' || Array.isArray(value))
            result = value.length;
        else
            result = Object.keys(value).length;
        return { minLength: !(result >= validator.data) };
    }
};
