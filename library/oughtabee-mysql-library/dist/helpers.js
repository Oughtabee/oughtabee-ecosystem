"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrayOfObjFields = exports.parseObjFields = exports.convertNestedProperties = exports.convertDatesToStrings = exports.convertCustomValues = exports.isValidationError = exports.isDuplicateEntryError = exports.throwNotFound = exports.TIMESTAMP_COLUMNS = void 0;
const common_1 = require("@oughtabee/common");
const lodash_set_1 = __importDefault(require("lodash.set"));
const logger = new common_1.Logger(__filename);
exports.TIMESTAMP_COLUMNS = ['created_at', 'updated_at', 'deleted_at'];
const throwNotFound = (rows, message) => {
    if (!rows || rows.length <= 0 || !rows[0]) {
        throw common_1.errors.generic.NOT_FOUND(message);
    }
};
exports.throwNotFound = throwNotFound;
const isDuplicateEntryError = (error) => error && error.code === 'ER_DUP_ENTRY';
exports.isDuplicateEntryError = isDuplicateEntryError;
const isValidationError = (error) => error && error.code === 'ER_BAD_NULL_ERROR';
exports.isValidationError = isValidationError;
const convertCustomValues = (o) => {
    Object.keys(o).forEach((key) => {
        const k = key.toLowerCase();
        if (k.startsWith('json_') || k.endsWith('_json')) {
            try {
                o[key] = JSON.parse(o[key]);
            }
            catch (error) {
                logger.info(`Unable to JSON.parse(${key})`, error);
            }
        }
        else if (k.endsWith('_list') || k.endsWith('_array')) {
            // convert lists to arrays
            try {
                o[key] = o[key] ? o[key].split(',') : [];
            }
            catch (error) {
                logger.info(`Unable to .split(',') ${key}`, error);
            }
        }
        else if (k.endsWith('_at')) {
            try {
                if (o[key]) {
                    o[key] = new Date(o[key]).getTime();
                }
            }
            catch (error) {
                logger.warn('Unable to cast "_at" column to millis', error);
            }
        }
    });
    return o;
};
exports.convertCustomValues = convertCustomValues;
const convertDatesToStrings = (o) => {
    Object.keys(o).forEach((key) => {
        const k = key.toLowerCase();
        if (k.endsWith('_at')) {
            try {
                if (o[key]) {
                    o[key] = new Date(o[key]).toISOString().slice(0, 19).replace('T', ' ');
                }
            }
            catch (error) {
                logger.warn('Unable to cast "_at" column to date', error);
            }
        }
    });
    return o;
};
exports.convertDatesToStrings = convertDatesToStrings;
const convertNestedProperties = (obj) => Object.keys(obj).reduce((o, key) => (0, lodash_set_1.default)(o, key, obj[key]), {});
exports.convertNestedProperties = convertNestedProperties;
const parseObjFields = (obj, custom = true, dateStr = false) => {
    if (custom) {
        obj = (0, exports.convertCustomValues)(obj);
    }
    if (dateStr) {
        obj = (0, exports.convertDatesToStrings)(obj);
    }
    return (0, exports.convertNestedProperties)(obj);
};
exports.parseObjFields = parseObjFields;
// export const parseArrayOfObjFields = (array, custom = true, dateStr = false) => Array.isArray(array) ? array?.map((obj) => parseObjFields(obj, custom, dateStr)) : [];
const parseArrayOfObjFields = (array, custom = true, dateStr = false) => array?.map((obj) => (0, exports.parseObjFields)(obj, custom, dateStr));
exports.parseArrayOfObjFields = parseArrayOfObjFields;
exports.default = {
    throwNotFound: exports.throwNotFound,
    parseArrayOfObjFields: exports.parseArrayOfObjFields,
    parseObjFields: exports.parseObjFields,
    isDuplicateEntryError: exports.isDuplicateEntryError,
    isValidationError: exports.isValidationError,
    TIMESTAMP_COLUMNS: exports.TIMESTAMP_COLUMNS
};
//# sourceMappingURL=helpers.js.map