"use strict";
/* eslint-disable no-console */
/* eslint-disable no-octal */
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
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const common_1 = require("./common");
const types_1 = require("./types");
const { ENVIRONMENT = types_1.Environments.DOCKER } = process.env;
const { LOG_COLORS = false, LOG_SHORT_TIME = false, LOG_LEVEL = [types_1.Environments.DOCKER, types_1.Environments.LOCAL, types_1.Environments.LOCAL_TESTING, types_1.Environments.UNIT_TESTING].includes(ENVIRONMENT)
    ? 'extra'
    : 'debug' } = process.env;
const IS_WEB = typeof window !== 'undefined';
const LEVELS = {
    extra: 1,
    trace: 2,
    debug: 3,
    info: 4,
    warn: 5,
    error: 6,
    fatal: 7
};
const LEVEL = LEVELS[LOG_LEVEL.toLowerCase()] || 2;
const colors = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m'
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
};
const COLORS = {
    trace: {
        bg: colors.bg.Blue,
        fg: colors.fg.White
    },
    extra: {
        bg: colors.bg.Black,
        fg: colors.fg.Cyan
    },
    debug: {
        bg: colors.bg.Black,
        fg: colors.fg.Blue
    },
    info: {
        bg: colors.bg.Black,
        fg: colors.fg.White
    },
    warn: {
        bg: colors.bg.Black,
        fg: colors.fg.Yellow
    },
    error: {
        bg: colors.bg.Black,
        fg: colors.fg.Red
    },
    fatal: {
        bg: colors.bg.Red,
        fg: colors.fg.Black
    }
};
class Logger {
    constructor(prepend, basename = true) {
        if (!prepend) {
            throw new Error('You must specify the log prepend! Preferably, it should be the file that is calling the Logger class.');
        }
        if (basename) {
            try {
                prepend = path.normalize(prepend);
                prepend = prepend.replace(`${path.sep}index.js`, '');
                prepend = path.basename(prepend);
            }
            catch (error) {
                // ignore error
            }
        }
        // @ts-ignore
        if (!console.extra) {
            // @ts-ignore
            console.extra = console.log;
        }
        if (!console.debug) {
            console.debug = console.log;
        }
        if (!console.warn) {
            console.warn = console.log;
        }
        if (!console.error) {
            console.error = console.log;
        }
        // @ts-ignore
        if (!console.fatal) {
            // @ts-ignore
            console.fatal = console.error;
        }
        this.build = (level, bgColor, fgColor) => {
            const a = [];
            if (!IS_WEB && LOG_COLORS) {
                if (fgColor) {
                    a.push(fgColor);
                }
                if (bgColor) {
                    a.push(bgColor);
                }
            }
            let dateTime;
            if (LOG_SHORT_TIME) {
                dateTime = (0, common_1.getLocalTime)();
            }
            else {
                dateTime = (0, common_1.getLocalDateTime)();
            }
            a.push(`${dateTime} ${(0, common_1.pad)(level, 6, ' ')}`);
            // TODO: pull in module info here so we can identify caller (different in typescript)
            // if (process?.env) {
            //   ['npm_package_name', 'npm_package_version'].forEach((k) => {
            //     if (process.env[k]) {
            //       a.push(` ${process.env[k]}`);
            //     }
            //   })
            // }
            if (prepend && prepend !== 'index.js') {
                a.push(` ${prepend}`);
            }
            return a.join(' ');
        };
        this.group = console.group;
        this.groupEnd = console.groupEnd;
        Object.keys(LEVELS).map((k) => {
            this[k] = (...x) => {
                if (LEVELS[k] >= LEVEL) {
                    // hacky solution because google chrome introduced changes that don't allow for filtering in console
                    let str = '';
                    if (x && x[0] && typeof x[0] === 'string') {
                        str = ` ${x[0]}`;
                        x.shift();
                    }
                    console[k](`${this.build(k.toUpperCase(), COLORS[k].bg, COLORS[k].fg)} ${(0, common_1.parentFuncName)()}${str}`, ...x, !IS_WEB && LOG_COLORS ? colors.Reset : '');
                }
            };
        });
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map