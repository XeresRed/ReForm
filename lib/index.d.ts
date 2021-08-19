import { Config } from './models/Config';
import { FormValues } from './models/FormValues.models';
import { ValidationType, ValidatorType, Primitives } from './models/Validators.models';
export declare const useForm: (InitialState: FormValues, config?: Config) => {
    values: FormValues;
    errors: {};
    ValidateInput: <T>(fieldName: string, value: T) => void;
    ValidateSubmit: () => void;
    validationRules: ValidationType;
    addValidationRules: (newRules: ValidationType) => void;
    setValidators: <T_1>(formField: string, validators: ValidatorType<Primitives<T_1>>[]) => boolean;
};
export declare const defaultValidators: import("./models/Validators.models").TValidator;
