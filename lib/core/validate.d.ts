import { ValidationType, ValidatorType } from "../models/Validators.models";
export declare const validate: <T>(validationRules: ValidationType, validator: ValidatorType<any>, value: T) => {
    result: boolean;
    validation: {
        [key: string]: boolean;
    };
};
