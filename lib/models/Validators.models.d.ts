export interface Validator<K> {
    type: string;
    data: K;
}
export declare type ValidationType<T, S> = {
    [K in keyof T]: (value: T, validator: Validator<S>) => boolean;
};
export declare const ValidationRules: {
    email: (value: string, validator?: Validator<string> | undefined) => boolean;
    required: <T>(value: T) => boolean;
    max: (value: number, validator: Validator<number>) => boolean;
    min: (value: number, validator: Validator<number>) => boolean;
    maxLength: (value: string | Array<any> | object, validator: Validator<number>) => boolean;
    minLength: (value: string | Array<any> | object, validator: Validator<number>) => boolean;
};
