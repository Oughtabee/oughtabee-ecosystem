const { ENVIRONMENT = 'docker', DEFAULT_TIMEZONE = 'America/Los_Angeles' } = process.env;


export const getLocalDateTime = (millis = new Date().getTime(), timeZone = DEFAULT_TIMEZONE) => {
    try {
        const dt = new Date(millis);
        if (dt.toLocaleDateString() === 'Invalid Date') {
            return '';
        }
        return `${dt.toLocaleDateString('en-US', { timeZone })} ${dt.toLocaleTimeString('en-US', { timeZone })}`;
    } catch (error) {
        console.error('Unable to getLocalDateTime', error);
    }
};

export const getLocalTime = (millis = new Date().getTime(), timeZone = DEFAULT_TIMEZONE) => {
    try {
        const dt = new Date(millis);
        if (dt.toLocaleDateString() === 'Invalid Date') {
            return '';
        }
        return `${dt.toLocaleTimeString('en-US', { timeZone })}`;
    } catch (error) {
        console.error('Unable to getLocalTime', error);
    }
};

/* eslint-disable no-console */
const findFirstOccurrence = (string, searchElements, fromIndex = 0) => {
    try {
        let min = string.length;
        for (let i = 0; i < searchElements.length; i += 1) {
            const occ = string.indexOf(searchElements[i], fromIndex);
            if (occ !== -1 && occ < min) {
                min = occ;
            }
        }
        return min === string.length ? -1 : min;
    } catch (error) {
        console.error('Unable to findFirstOccurrence', error);
    }
};

const getFnNameFromStack = (stack, append) => {
    try {
        const firstCharacter = stack.indexOf('at ') + 3;
        const lastCharacter = findFirstOccurrence(stack, [' ', ':', '\n'], firstCharacter);
        return `${stack.slice(firstCharacter, lastCharacter).replace('Object.', '')}${append}`;
    } catch (error) {
        console.error('Unable to getFnNameFromStack', error);
        return '';
    }
};

export const parentFuncName = (append = '();') => {
    try {
        const obj: any = {};
        Error.captureStackTrace(obj, parentFuncName);
        const { stack } = obj;
        const array = getFnNameFromStack(stack.split('\n').slice(2).join('\n'), append).split('/');
        return array[array.length - 1];
    } catch (error) {
        console.error('Unable to parentFuncName', error);
    }
};

export const pad = (n, width = 2, z = '0') => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};