export interface Values<T> {
    value: string;
    validators: {type: string, data: T}[],
    class?: string;
}

export type FormValues<T> = {
    [K in keyof T]: Values<T[K]>
}