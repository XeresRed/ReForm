import { IExtrasConfig } from "./Config";

export type Primitives<T> = boolean|string|number|null|undefined|T|Array<T>|object;


export interface IDefaultValidators {
    Required: () => ({readonly type: string, data: Primitives<null>});
    Email: (regex: string | null) => ({readonly type: string, data: Primitives<string | null>});
    MinLength: (length: number) => ({readonly type: string, data: Primitives<number>});
    MaxLength: (length: number) => ({readonly type: string, data: Primitives<number>});
    Min: (length: number) => ({readonly type: string, data: Primitives<number>});
    Max: (length: number) => ({readonly type: string, data: Primitives<number>});
};

export interface ValidatorFunctionalType  {
    [k: string]: <T>(data?: Primitives<T>, extras?: IExtrasConfig) => {
        type: string;
        data: Primitives<T>;
        extras?: IExtrasConfig
    }
}

export type TValidator = ValidatorFunctionalType & IDefaultValidators

export const Validators: TValidator = {
    Required: (): ValidatorType<null> => ({type: "required", data: null}),
    Email: (regex: string | null = null): ValidatorType<string | null> => ({type: 'email', data: regex}),
    MinLength: (length: number): ValidatorType<number> => ({type: 'minLength', data: length}),
    MaxLength: (length: number): ValidatorType<number> => ({type: 'maxLength', data: length}),
    Min: (length: number): ValidatorType<number> => ({type: 'min', data: length}),
    Max: (length: number): ValidatorType<number> => ({type: 'max', data: length})
}


export interface ValidatorType<T> {
    type: string;
    data: Primitives<T>;
    extras?: IExtrasConfig

}
export interface ValidationType {
    [key: string]: <T, S>(value: Primitives<T>, validator?: ValidatorType<S>) => {[key:string]: boolean}
}



export const ValidationRules: ValidationType = {
    email: (value: string, validator?: {type: string, data: string, extras: {}}) => {
        let result: any
        if (validator && validator.data) {
            result = value.match(validator.data as string)
            return !!result ? {email: false} : {email: true}
        }
        else {
            result = value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
            return !!result ?  {email: false} : {email: true}
        }
    },
    required: <T>(value: T) => {
        if (value === null  || value === undefined) return {required: true}
        else if (typeof value === 'string') return {required: value === '' || value.length === 0}
        else if (typeof value === 'number') return {required: isNaN(value)}

        return {required: false};
    },
    max: (value: number, validator: {type: string, data: number, extras: {}}) => {
        if (isNaN(value)) return {max: true};
        value = Number(value)
        return {max: !(value <= validator.data) }
    },
    min: (value: number, validator: {type: string, data: number, extras: {}}) => {
        if (isNaN(value)) return {min: true}
        value = Number(value)
        return {min: !(value >= validator.data) }
    },
    maxLength: <T>(value:  string | Array<T> | object , validator: {type: string, data: number, extras: {}}) => {
        let result = 0;
        if (typeof value === 'string' || Array.isArray(value)) result = value.length
        else result = Object.keys(value).length

        return {maxLength: !(result <= validator.data)}
    },
    minLength: <T>(value: string | Array<T> | object  , validator: {type: string, data: number, extras: {}}) => {
        let result = 0;
        if (typeof value === 'string' || Array.isArray(value)) result = value.length
        else result = Object.keys(value).length
        return {minLength: !(result >= validator.data)}
    }

}