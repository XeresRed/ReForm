import React from 'react';
import { FormValues } from './models/FormValues.models';
import { ValidationType } from './models/Validators.models';
export declare const useForm: <T>(InitialState: FormValues<T>) => {
    values: FormValues<T>;
    errors: {};
    ValidateInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    ValidateSubmit: () => void;
    SetValidators: React.Dispatch<React.SetStateAction<{
        email: (value: string, validator?: import("./models/Validators.models").Validator<string> | undefined) => boolean;
        required: <T_1>(value: T_1) => boolean;
        max: (value: number, validator: import("./models/Validators.models").Validator<number>) => boolean;
        min: (value: number, validator: import("./models/Validators.models").Validator<number>) => boolean;
        maxLength: (value: string | object | any[], validator: import("./models/Validators.models").Validator<number>) => boolean;
        minLength: (value: string | object | any[], validator: import("./models/Validators.models").Validator<number>) => boolean;
    }>>;
    addValidationRules: <T_2, K>(newRules: ValidationType<T_2, K>) => void;
};
