"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionsFromEnum = exports.Environments = void 0;
var Environments;
(function (Environments) {
    Environments["LOCAL"] = "local";
    Environments["DOCKER"] = "docker";
    Environments["UNIT_TESTING"] = "unit.testing";
    Environments["LOCAL_TESTING"] = "local.testing";
    Environments["DEVELOPMENT"] = "development";
    Environments["STAGING"] = "staging";
    Environments["PRODUCTION"] = "production";
})(Environments = exports.Environments || (exports.Environments = {}));
const getOptionsFromEnum = (ENUM) => Object.keys(ENUM).map((k) => ({
    value: ENUM[k],
    label: k
}));
exports.getOptionsFromEnum = getOptionsFromEnum;
//# sourceMappingURL=types.js.map