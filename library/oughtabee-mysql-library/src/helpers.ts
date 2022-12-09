import { Logger, errors } from '@oughtabee/common';
import set from 'lodash.set';

const logger = new Logger(__filename);

export const TIMESTAMP_COLUMNS = ['created_at', 'updated_at', 'deleted_at'];

export const throwNotFound = (rows, message?: string) => {
  if (!rows || rows.length <= 0 || !rows[0]) {
    throw errors.generic.NOT_FOUND(message);
  }
};

export const isDuplicateEntryError = (error) => error && error.code === 'ER_DUP_ENTRY';

export const isValidationError = (error) => error && error.code === 'ER_BAD_NULL_ERROR';

export const convertCustomValues = (o) => {
  Object.keys(o).forEach((key) => {
    const k = key.toLowerCase();
    if (k.startsWith('json_') || k.endsWith('_json')) {
      try {
        o[key] = JSON.parse(o[key]);
      } catch (error) {
        logger.info(`Unable to JSON.parse(${key})`, error);
      }
    } else if (k.endsWith('_list') || k.endsWith('_array')) {
      // convert lists to arrays
      try {
        o[key] = o[key] ? o[key].split(',') : [];
      } catch (error) {
        logger.info(`Unable to .split(',') ${key}`, error);
      }
    } else if (k.endsWith('_at')) {
      try {
        if (o[key]) {
          o[key] = new Date(o[key]).getTime();
        }
      } catch (error) {
        logger.warn('Unable to cast "_at" column to millis', error);
      }
    }
  });
  return o;
};

export const convertDatesToStrings = (o) => {
  Object.keys(o).forEach((key) => {
    const k = key.toLowerCase();
    if (k.endsWith('_at')) {
      try {
        if (o[key]) {
          o[key] = new Date(o[key]).toISOString().slice(0, 19).replace('T', ' ');
        }
      } catch (error) {
        logger.warn('Unable to cast "_at" column to date', error);
      }
    }
  });
  return o;
};

export const convertNestedProperties = (obj) => Object.keys(obj).reduce((o, key) => set(o, key, obj[key]), {});

export const parseObjFields = (obj, custom = true, dateStr = false) => {
  if (custom) {
    obj = convertCustomValues(obj);
  }

  if (dateStr) {
    obj = convertDatesToStrings(obj);
  }

  return convertNestedProperties(obj);
};

// export const parseArrayOfObjFields = (array, custom = true, dateStr = false) => Array.isArray(array) ? array?.map((obj) => parseObjFields(obj, custom, dateStr)) : [];
export const parseArrayOfObjFields = (array, custom = true, dateStr = false) => array?.map((obj) => parseObjFields(obj, custom, dateStr));

export default {
  throwNotFound,
  parseArrayOfObjFields,
  parseObjFields,
  isDuplicateEntryError,
  isValidationError,
  TIMESTAMP_COLUMNS
};