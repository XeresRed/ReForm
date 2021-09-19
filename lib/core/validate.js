export var validate = function (validationRules, validator, value) {
    var validation = validationRules[validator.type](value, validator);
    return { result: validation[validator.type], validation: validation };
};
