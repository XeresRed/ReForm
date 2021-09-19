export interface Config {
    error?: {
        intialize: boolean;
        default: boolean;
    };
    customClass?: {
        success: string;
        error: string;
    };
}
export interface IExtrasConfig {
    bindField?: string;
    validationMessage?: {
        success: string;
        error: string;
    };
}
export interface IValidationRulesConfig {
    acceptData: boolean;
}
