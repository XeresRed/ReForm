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
        successMessage: string;
        errorMessage: string;
    };
}
export interface IValidationRulesConfig {
    acceptData: boolean;
}
