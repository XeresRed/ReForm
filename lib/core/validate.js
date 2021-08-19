var getMessageValidation = function (result, validator) {
    if (!validator.extras || !validator.extras.validationMessage)
        return null;
    if (result)
        return validator.extras.validationMessage.errorMessage;
    else
        validator.extras.validationMessage.successMessage;
    return null;
};
export var validate = function (validationRules, validator, value) {
    var validation = validationRules[validator.type](value, validator);
    var message = getMessageValidation(validation[validator.type], validator);
    if (message)
        validation[validator.type] = message;
    return { result: validation[validator.type], validation: validation };
};
