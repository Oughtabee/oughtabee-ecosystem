export declare enum Environments {
    LOCAL = "local",
    DOCKER = "docker",
    UNIT_TESTING = "unit.testing",
    LOCAL_TESTING = "local.testing",
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production"
}
export declare const getOptionsFromEnum: (ENUM: any) => {
    value: any;
    label: string | number | symbol;
}[];
//# sourceMappingURL=types.d.ts.map