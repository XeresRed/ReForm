import { ValidationType, ValidatorType } from "../models/Validators.models";

export const validate = <T>(validationRules: ValidationType, validator: ValidatorType<any>, value: T ) => {
    const validation = validationRules[validator.type](value, validator);
    return {result: validation[validator.type], validation}
    
}

