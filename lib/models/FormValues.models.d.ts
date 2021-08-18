import { Primitives, ValidatorType } from './Validators.models';
export interface Values {
    value: string;
    validators: ValidatorType<Primitives<any>>[];
    class?: string;
    hasErrors?: boolean;
}
export declare type FormValues = {
    [k: string]: Values;
};
