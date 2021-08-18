import React from 'react';
import { Config } from './models/Config';
import { FormValues, Values } from './models/FormValues.models';
import { ValidationRules, ValidationType, Validators, ValidatorType, Primitives  } from './models/Validators.models';



const initConfig: Config = {
    error: {intialize: false, default: false},
    customClass: {success: "", error: ""},
}

export const useForm = (InitialState: FormValues, config: Config = initConfig) => {

    const [values, setValues] = React.useState<FormValues>(InitialState);
    const [errors, setErrors] = React.useState({});
    const [validationRules, SetValidationRules]= React.useState<ValidationType>(ValidationRules);

    React.useEffect( () => {
        if (config && config.error?.intialize) {
            let initErrors = {}
            Object.keys(values).forEach( key => {
                const field: Values = values[key];
                for (const validator of field.validators) {
                    if (key in initErrors) {
                        initErrors[key] = {
                            ...initErrors[key],
                            [validator.type]: config.error?.default
                        }
                    } else {
                        initErrors[key] = {
                            [validator.type]: config.error?.default
                        }
                    }
                }
            })
        }
    }, [])


    const ValidateInput = (id: string, value: any) => {
        const field: Values = values[id];
        let flagError = [];
        let resultErrors = {};
        for (const validator of field.validators) {
            if (validator.extras) {
                if (validator.extras.bindField && validator.extras.bindField.activate) {
                    try {
                        validator.data = values[validator.extras.bindField.field].value;
                    } catch (error) {
                        setErrors({
                            ...errors,
                            [id]: {...errors[id], ...{Exception: error}}
                        })
                        return;
                    }
                }
            }
            const validation = validationRules[validator.type](value, validator);
            if (validation[validator.type]) {
                flagError.push(false)
            }

            resultErrors = {
                ...resultErrors,
                [id]: {...resultErrors[id], ...validation}
            }
        }

        setErrors({
            ...errors,
            ...resultErrors
        })

        setValues({
            ...values,
            [id]: {
                validators: values[id].validators,
                value: value,
                class: flagError.length === 0 ? config.customClass?.success : config.customClass?.error,
                hasErrors: !(flagError.length === 0)
            }
        });

    }

    const addValidationRules = (newRules: ValidationType) => {
        SetValidationRules({
            ...validationRules,
            ...newRules
        })
    }

    const setValidators= <T>(formField: string, validator: ValidatorType<Primitives<T>>[]) => {
        if (!(formField in values)) return false

        const val = {...values[formField]}
        val.validators = validator
        setValues({
            ...values,
            [formField]: val
        });
        return true
    }

    const ValidateSubmit = () => {
        for (const keyValue of Object.keys(values)) {
            const field: Values = values[keyValue];
            for (const validator of field.validators) {
                const validation = validationRules[validator.type](field.value, validator);
                if (validation) {
                    setErrors({
                        ...errors,
                        [keyValue]: [...errors[keyValue], validation]
                    })
                } else {
                    setErrors({
                        ...errors,
                        [keyValue]: []
                    })
                }
            }
        }
    }


    return {
        values,
        errors,
        ValidateInput,
        ValidateSubmit,
        validationRules,
        addValidationRules,
        setValidators
    }
    
}


export const defaultValidators = Validators;
