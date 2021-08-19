import { IExtrasConfig } from "./Config";
export declare type Primitives<T> = boolean | string | number | null | undefined | T | Array<T> | object;
export interface IDefaultValidators {
    Required: () => ({
        readonly type: string;
        data: Primitives<null>;
    });
    Email: (regex: string | null) => ({
        readonly type: string;
        data: Primitives<string | null>;
    });
    MinLength: (length: number) => ({
        readonly type: string;
        data: Primitives<number>;
    });
    MaxLength: (length: number) => ({
        readonly type: string;
        data: Primitives<number>;
    });
    Min: (length: number) => ({
        readonly type: string;
        data: Primitives<number>;
    });
    Max: (length: number) => ({
        readonly type: string;
        data: Primitives<number>;
    });
}
export interface ValidatorFunctionalType {
    [k: string]: <T>(data?: Primitives<T>, extras?: IExtrasConfig) => {
        type: string;
        data: Primitives<T>;
        extras?: IExtrasConfig;
    };
}
export declare type TValidator = ValidatorFunctionalType & IDefaultValidators;
export declare const Validators: TValidator;
export interface ValidatorType<T> {
    type: string;
    data: Primitives<T>;
    extras?: IExtrasConfig;
}
export interface ValidationType {
    [key: string]: <T, S>(value: Primitives<T>, validator?: ValidatorType<S>) => {
        [key: string]: boolean | string;
    };
}
export declare const ValidationRules: ValidationType;
