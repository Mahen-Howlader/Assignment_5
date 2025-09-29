export interface TErrorSources {
    statusCode: string;
    message: string
};

export interface TGenericErrorResponse {
    statusCode: number,
    message: string,
    errorSources?: TErrorSources[]
};