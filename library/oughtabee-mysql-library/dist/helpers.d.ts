export declare const TIMESTAMP_COLUMNS: string[];
export declare const throwNotFound: (rows: any, message?: string) => void;
export declare const isDuplicateEntryError: (error: any) => any;
export declare const isValidationError: (error: any) => any;
export declare const convertCustomValues: (o: any) => any;
export declare const convertDatesToStrings: (o: any) => any;
export declare const convertNestedProperties: (obj: any) => {};
export declare const parseObjFields: (obj: any, custom?: boolean, dateStr?: boolean) => {};
export declare const parseArrayOfObjFields: (array: any, custom?: boolean, dateStr?: boolean) => any;
declare const _default: {
    throwNotFound: (rows: any, message?: string | undefined) => void;
    parseArrayOfObjFields: (array: any, custom?: boolean, dateStr?: boolean) => any;
    parseObjFields: (obj: any, custom?: boolean, dateStr?: boolean) => {};
    isDuplicateEntryError: (error: any) => any;
    isValidationError: (error: any) => any;
    TIMESTAMP_COLUMNS: string[];
};
export default _default;
//# sourceMappingURL=helpers.d.ts.map