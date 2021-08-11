import React from 'react';
import { FormValues, Values } from './models/FormValues.models';
import { ValidationRules, ValidationType } from './models/Validators.models';

export const useForm = <T>(InitialState: FormValues<T>) => {
    const [values, setValues] = React.useState(InitialState);
    const [errors, setErrors] = React.useState({});
    const [validators, SetValidators] = React.useState(ValidationRules);

    const ValidateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field: Values<any> = values[event.target.name];
        let flagError = [];
        for (const validator of field.validators) {
            const validation = validators[validator.type](event.target.value, validator);
            if (validation) {
                flagError.push(false)
                setErrors({
                    ...errors,
                    [event.target.name]: [...errors[event.target.name], validation]
                })
            } else {
                setErrors({
                    ...errors,
                    [event.target.name]: []
                })
            }
        }
        setValues({
            ...values,
            [event.target.name]: {
                validators: values[event.target.name].validators,
                value: event.target.value,
                class: flagError.length === 0 ? 'success' : 'error'
            }
        });

    }

    const addValidationRules = <T, K>(newRules: ValidationType<T,K>) => {
        SetValidators({
            ...validators,
            ...newRules
        })
    }

    const ValidateSubmit = () => {
        for (const keyValue of Object.keys(values)) {
            const field: Values<any> = values[keyValue];
            for (const validator of field.validators) {
                const validation = validators[validator.type](field.value, validator);
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
        validators,
        addValidationRules
    }
    
}

export const Validators = {
    Required: ()=> ({type: 'required', data: null}),
    Email: (regex: string | null = null)=> ({type: 'email', data: regex}),
    minLength: (length: number)=> ({type: 'minLength', data: length}),
    maxLength: (length: number)=> ({type: 'maxLength', data: length}),
    min: (length: number)=> ({type: 'min', data: length}),
    max: (length: number)=> ({type: 'max', data: length})
}