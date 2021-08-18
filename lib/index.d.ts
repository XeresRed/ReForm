import { Config } from './models/Config';
import { FormValues } from './models/FormValues.models';
import { ValidationType, ValidatorType, Primitives } from './models/Validators.models';
export declare const useForm: (InitialState: FormValues, config?: Config) => {
    values: FormValues;
    errors: {};
    ValidateInput: (id: string, value: any) => void;
    ValidateSubmit: () => void;
    validationRules: ValidationType;
    addValidationRules: (newRules: ValidationType) => void;
    setValidators: <T>(formField: string, validator: ValidatorType<Primitives<T>>[]) => boolean;
};
export declare const defaultValidators: import("./models/Validators.models").TValidator;
