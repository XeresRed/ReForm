import { Primitives, ValidatorType } from './Validators.models';

export interface Values {
    value: Primitives<any>;
    validators: ValidatorType<Primitives<any>>[],
    class?: string;
    hasErrors?: boolean;
}

export type FormValues = {
    [k: string]: Values
}