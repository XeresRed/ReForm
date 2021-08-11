export interface Validator<K> {
    type: string;
    data: K
}

export type ValidationType<T, S> = {
    [K in keyof T]: (value: T, validator: Validator<S>) => boolean
}

export const ValidationRules = {
    email: (value: string, validator?: Validator<string>): boolean => {
        let result: any
        if (validator && validator.data) {
            result = value.match(validator.data)
            return !!result ? false : true
        }
        else {
            result = value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
            return !!result ?  false : true
        }
    },
    required: <T>(value: T) => {
        if (value === null  || value === undefined) return true
        else if (typeof value === 'string') return value === '' || value.length === 0
        else if (typeof value === 'number') return isNaN(value)

        return false;
    },
    max: (value: number, validator: Validator<number>) => {
        if (isNaN(value)) return true
        value = Number(value)
        return value <= validator.data ? false : true
    },
    min: (value: number, validator: Validator<number>) => {
        if (isNaN(value)) return true
        value = Number(value)
        return value >= validator.data ? false : true
    },
    maxLength: (value: string | Array<any> | object, validator: Validator<number>) => {
        let result = 0;
        if (typeof value === 'string' || Array.isArray(value)) result = value.length
        else result = Object.keys(value).length

        return result <= validator.data ? false : true
    },
    minLength: (value: string | Array<any> | object, validator:  Validator<number>) => {
        let result = 0;
        if (typeof value === 'string' || Array.isArray(value)) result = value.length
        else result = Object.keys(value).length
        return result >= validator.data ? false : true
    }

}