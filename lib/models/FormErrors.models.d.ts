declare type Values<S> = {
    [K in keyof S]: string;
};
export declare type FormErrros<T> = {
    [K in keyof T]: Values<T[K]>;
};
export {};
