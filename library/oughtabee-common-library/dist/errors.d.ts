export declare const errors: {
    generic: {
        NOT_FOUND: (message?: string, details?: any) => Error & {
            statusCode: number | undefined;
            message: any;
            code: any;
            details: any;
        };
    };
    badRequest: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    unauthorized: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    paymentRequired: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    forbidden: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    notFound: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    conflict: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    badData: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    illegal: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
    internal: (code?: any, message?: any, details?: any) => Error & {
        statusCode: number | undefined;
        message: any;
        code: any;
        details: any;
    };
};
//# sourceMappingURL=errors.d.ts.map