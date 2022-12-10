"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const constants_1 = require("./constants");
const db = new database_1.default({
    host: constants_1.MYSQL_WRITE_HOST,
    user: constants_1.MYSQL_WRITE_USER,
    password: constants_1.MYSQL_WRITE_PASSWORD,
    port: parseInt(constants_1.MYSQL_WRITE_PORT || '3306'),
    database: constants_1.MYSQL_WRITE_DATABASE,
    timezone: 'utc'
});
exports.default = {
    query: db.query,
    destroy: db.destroy,
    isHealthy: db.isHealthy
};
//# sourceMappingURL=write.js.map