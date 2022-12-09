export enum Environments {
    LOCAL = 'local',
    DOCKER = 'docker',
    UNIT_TESTING = 'unit.testing',
    LOCAL_TESTING = 'local.testing',
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production'
}

export const getOptionsFromEnum = (ENUM) =>
    (Object.keys(ENUM) as Array<keyof typeof ENUM>).map((k) => ({
        value: ENUM[k],
        label: k
    }));