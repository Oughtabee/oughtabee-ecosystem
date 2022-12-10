"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUIRED = exports.MYSQL_WRITE_CONNECTIONS = exports.MYSQL_WRITE_PORT = exports.MYSQL_WRITE_PASSWORD = exports.MYSQL_WRITE_USER = exports.MYSQL_WRITE_DATABASE = exports.MYSQL_WRITE_HOST = exports.MYSQL_READ_CONNECTIONS = exports.MYSQL_READ_PORT = exports.MYSQL_READ_PASSWORD = exports.MYSQL_READ_USER = exports.MYSQL_READ_DATABASE = exports.MYSQL_READ_HOST = exports.MYSQL_VALIDATION_QUERY = exports.MYSQL_CONNECTIONS = exports.MYSQL_PORT = exports.MYSQL_PASSWORD = exports.MYSQL_USER = exports.MYSQL_DATABASE = exports.MYSQL_HOST = void 0;
_a = process.env, exports.MYSQL_HOST = _a.MYSQL_HOST, exports.MYSQL_DATABASE = _a.MYSQL_DATABASE, exports.MYSQL_USER = _a.MYSQL_USER, exports.MYSQL_PASSWORD = _a.MYSQL_PASSWORD, _b = _a.MYSQL_PORT, exports.MYSQL_PORT = _b === void 0 ? '3306' : _b, _c = _a.MYSQL_CONNECTIONS, exports.MYSQL_CONNECTIONS = _c === void 0 ? 25 : _c, _d = _a.MYSQL_VALIDATION_QUERY, exports.MYSQL_VALIDATION_QUERY = _d === void 0 ? 'SHOW TABLES' : _d, 
// read specific configs, default to single
_e = _a.MYSQL_READ_HOST, 
// read specific configs, default to single
exports.MYSQL_READ_HOST = _e === void 0 ? exports.MYSQL_HOST : _e, _f = _a.MYSQL_READ_DATABASE, exports.MYSQL_READ_DATABASE = _f === void 0 ? exports.MYSQL_DATABASE : _f, _g = _a.MYSQL_READ_USER, exports.MYSQL_READ_USER = _g === void 0 ? exports.MYSQL_USER : _g, _h = _a.MYSQL_READ_PASSWORD, exports.MYSQL_READ_PASSWORD = _h === void 0 ? exports.MYSQL_PASSWORD : _h, _j = _a.MYSQL_READ_PORT, exports.MYSQL_READ_PORT = _j === void 0 ? exports.MYSQL_PORT : _j, _k = _a.MYSQL_READ_CONNECTIONS, exports.MYSQL_READ_CONNECTIONS = _k === void 0 ? exports.MYSQL_CONNECTIONS : _k, 
// write specific configs, default to single
_l = _a.MYSQL_WRITE_HOST, 
// write specific configs, default to single
exports.MYSQL_WRITE_HOST = _l === void 0 ? exports.MYSQL_HOST : _l, _m = _a.MYSQL_WRITE_DATABASE, exports.MYSQL_WRITE_DATABASE = _m === void 0 ? exports.MYSQL_DATABASE : _m, _o = _a.MYSQL_WRITE_USER, exports.MYSQL_WRITE_USER = _o === void 0 ? exports.MYSQL_USER : _o, _p = _a.MYSQL_WRITE_PASSWORD, exports.MYSQL_WRITE_PASSWORD = _p === void 0 ? exports.MYSQL_PASSWORD : _p, _q = _a.MYSQL_WRITE_PORT, exports.MYSQL_WRITE_PORT = _q === void 0 ? exports.MYSQL_PORT : _q, _r = _a.MYSQL_WRITE_CONNECTIONS, exports.MYSQL_WRITE_CONNECTIONS = _r === void 0 ? exports.MYSQL_CONNECTIONS : _r;
exports.REQUIRED = {
    MYSQL_READ_HOST: exports.MYSQL_READ_HOST,
    MYSQL_READ_DATABASE: exports.MYSQL_READ_DATABASE,
    MYSQL_READ_USER: exports.MYSQL_READ_USER,
    MYSQL_READ_PASSWORD: exports.MYSQL_READ_PASSWORD,
    MYSQL_READ_PORT: exports.MYSQL_READ_PORT,
    MYSQL_READ_CONNECTIONS: exports.MYSQL_READ_CONNECTIONS,
    MYSQL_WRITE_HOST: exports.MYSQL_WRITE_HOST,
    MYSQL_WRITE_DATABASE: exports.MYSQL_WRITE_DATABASE,
    MYSQL_WRITE_USER: exports.MYSQL_WRITE_USER,
    MYSQL_WRITE_PASSWORD: exports.MYSQL_WRITE_PASSWORD,
    MYSQL_WRITE_PORT: exports.MYSQL_WRITE_PORT,
    MYSQL_WRITE_CONNECTIONS: exports.MYSQL_WRITE_CONNECTIONS,
};
exports.default = {
    ...exports.REQUIRED,
    REQUIRED: exports.REQUIRED,
    MYSQL_VALIDATION_QUERY: exports.MYSQL_VALIDATION_QUERY,
};
//# sourceMappingURL=constants.js.map