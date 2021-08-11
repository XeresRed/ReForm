type Values<S>  = {
    [K in keyof S]: string
}

export type FormErrros<T> = {
    [K in keyof T]: Values<T[K]>
}