import React, { useMemo } from 'react';
import { validate } from './core/validate';
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

   
    /**
     * This function validate the current value pass for all validators of the field
     * @param {string} fieldName refers to name of the field on the form structure
     * @param {T} value refers to the input of the fields
     * @returns {void} 
     */
    const ValidateInput = React.useCallback( <T>(fieldName: string, value: T) => {
        const field: Values = values[fieldName];
        let hasErrors = false;
        let resultErrors = {};
        for (const validator of field.validators) {
            if (validator.extras) {
                if (validator.extras.bindField) {
                    try {
                        validator.data = values[validator.extras.bindField].value;
                    } catch (error) {
                        setErrors({
                            ...errors,
                            [fieldName]: {...errors[fieldName], ...{Unexpecte: `The binding field doesn't exist or not could be use`}}
                        })
                        return;
                    }
                }
            }
            const {result, validation} = validate(ValidationRules, validator, value);
            if (result) hasErrors = true

            resultErrors = {
                ...resultErrors,
                [fieldName]: {...resultErrors[fieldName], ...validation}
            }
        }

        setErrors({
            ...errors,
            ...resultErrors
        })

        setValues({
            ...values,
            [fieldName]: {
                validators: values[fieldName].validators,
                value: value,
                class: !hasErrors ? config.customClass?.success : config.customClass?.error,
                hasErrors
            }
        });

    }, [values, validationRules, errors, setErrors])

    /**
     * Add new rule validation to the current form
     * @param {ValidationType} newRules object of rules
     * @returns {void}
     */
    const addValidationRules = React.useCallback( (newRules: ValidationType) => {
        SetValidationRules({
            ...validationRules,
            ...newRules
        })
    }, [validationRules, SetValidationRules])


    /**
     * Set a group of validators to a field, **this method delete old validators from your field, you need assing again**
     * @param {string} formField refers to name of the field on the form structure
     * @param {ValidatorType[]} validators Array of validators
     * @returns {boolean}
     */
    const setValidators= React.useCallback( <T>(formField: string, validators: ValidatorType<Primitives<T>>[]) => {
        if (!(formField in values)) return false

        const val = {...values[formField]}
        val.validators = validators
        setValues({
            ...values,
            [formField]: val
        });
        return true
    }, [values, setValues])

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

    const valid = () => {
        let isValid = true;
        Object.keys(values).forEach( key => {
            if (!('hasErrors' in values[key])) {
                isValid = false;
                return;
            }
            isValid = isValid && (values[key].hasErrors as boolean);
        })
        return isValid;
    }

    const getFormValues = () => {
        return Object.keys(values).reduce( (response,current) => {
            response[current] = values[current].value;
            return response
        }, {})
    }


    return {
        values,
        errors,
        ValidateInput,
        ValidateSubmit,
        validationRules,
        addValidationRules,
        setValidators,
        valid,
        getFormValues
    }
    
}


export const defaultValidators = Validators;
