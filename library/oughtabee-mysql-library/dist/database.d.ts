export default class Database {
    config: any;
    getConnection: any;
    query: any;
    create: any;
    destroy: any;
    recreate: any;
    isHealthy: any;
    pool: any;
    constructor({ host, database, user, password, port, timezone, charset, acquireTimeout, waitForConnections, connectionLimit, queueLimit }: {
        host: any;
        database: any;
        user: any;
        password: any;
        port?: number | undefined;
        timezone?: string | undefined;
        charset?: string | undefined;
        acquireTimeout?: number | undefined;
        waitForConnections?: boolean | undefined;
        connectionLimit?: number | undefined;
        queueLimit?: number | undefined;
    });
}
//# sourceMappingURL=database.d.ts.map