"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpers = exports.write = exports.read = void 0;
var read_1 = require("./read");
Object.defineProperty(exports, "read", { enumerable: true, get: function () { return __importDefault(read_1).default; } });
var write_1 = require("./write");
Object.defineProperty(exports, "write", { enumerable: true, get: function () { return __importDefault(write_1).default; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "helpers", { enumerable: true, get: function () { return __importDefault(helpers_1).default; } });
//export { default as custom } from './custom';
//export { default as builders } from './builders';
const read_2 = __importDefault(require("./read"));
const write_2 = __importDefault(require("./write"));
const helpers = __importStar(require("./helpers"));
//import custom from './custom';
//import * as builders from './builders';
exports.default = {
    read: read_2.default,
    write: write_2.default,
    helpers,
    //custom,
    //builders,
};
//# sourceMappingURL=index.js.map