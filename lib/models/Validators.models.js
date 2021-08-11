export var ValidationRules = {
    email: function (value, validator) {
        var result;
        if (validator && validator.data) {
            result = value.match(validator.data);
            return !!result ? false : true;
        }
        else {
            result = value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            return !!result ? false : true;
        }
    },
    required: function (value) {
        if (value === null || value === undefined)
            return true;
        else if (typeof value === 'string')
            return value === '' || value.length === 0;
        else if (typeof value === 'number')
            return isNaN(value);
        return false;
    },
    max: function (value, validator) {
        if (isNaN(value))
            return true;
        value = Number(value);
        return value <= validator.data ? false : true;
    },
    min: function (value, validator) {
        if (isNaN(value))
            return true;
        value = Number(value);
        return value >= validator.data ? false : true;
    },
    maxLength: function (value, validator) {
        var result = 0;
        if (typeof value === 'string' || Array.isArray(value))
            result = value.length;
        else
            result = Object.keys(value).length;
        return result <= validator.data ? false : true;
    },
    minLength: function (value, validator) {
        var result = 0;
        if (typeof value === 'string' || Array.isArray(value))
            result = value.length;
        else
            result = Object.keys(value).length;
        return result >= validator.data ? false : true;
    }
};
