import { Primitives, ValidatorType } from './Validators.models';

export interface Values {
    value: string;
    validators: ValidatorType<Primitives<any>>[],
    class?: string;
}

export type FormValues = {
    [k: string]: Values
}