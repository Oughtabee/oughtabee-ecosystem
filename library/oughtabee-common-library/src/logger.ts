/* eslint-disable no-console */
/* eslint-disable no-octal */

import * as path from 'path';
import { getLocalDateTime, getLocalTime, pad, parentFuncName } from './common';
import { Environments } from './types';

const { ENVIRONMENT = Environments.DOCKER } = process.env;

const {
  LOG_COLORS = false,
  LOG_SHORT_TIME = false,
  LOG_LEVEL = [Environments.DOCKER, Environments.LOCAL, Environments.LOCAL_TESTING, Environments.UNIT_TESTING].includes(
    ENVIRONMENT as Environments
  )
    ? 'extra'
    : 'debug'
} = process.env;

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

export default class Logger {
  build;
  group;
  groupEnd;
  extra;
  trace;
  debug;
  info;
  warn;
  error;
  fatal;

  constructor(prepend, basename = true) {
    if (!prepend) {
      throw new Error(
        'You must specify the log prepend! Preferably, it should be the file that is calling the Logger class.'
      );
    }
    if (basename) {
      try {
        prepend = path.normalize(prepend);
        prepend = prepend.replace(`${path.sep}index.js`, '');
        prepend = path.basename(prepend);
      } catch (error) {
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
      const a: any = [];

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
        dateTime = getLocalTime();
      } else {
        dateTime = getLocalDateTime();
      }

      a.push(`${dateTime} ${pad(level, 6, ' ')}`);

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

          console[k](
            `${this.build(k.toUpperCase(), COLORS[k].bg, COLORS[k].fg)} ${parentFuncName()}${str}`,
            ...x,
            !IS_WEB && LOG_COLORS ? colors.Reset : ''
          );
        }
      };
    });
  }
}