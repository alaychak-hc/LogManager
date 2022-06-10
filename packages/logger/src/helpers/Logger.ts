// #region ESLint Rules
/* eslint-disable no-shadow */
// #endregion

// #region Developer Information
/*
 ********************************************
    Author: Andrew Laychak
    Email: ALaychak@harriscomputer.com

    Created At: 05-16-2022 09:08:07 PM
    Last Modified: 05-20-2022 10:29:26 PM
    Last Updated By: Andrew Laychak

    Description: Global logger that handles logging data for various sources

    References:
      - Winston: https://github.com/winstonjs/winston
      - Winston-Daily-Rotate-File: https://github.com/winstonjs/winston-daily-rotate-file
 ********************************************
*/
// #endregion

// #region Imports
import { format as dformat } from 'date-fns';
import winston, { addColors, format, Logger } from 'winston';
import { boolean } from 'boolean';
import DailyRotateFile from 'winston-daily-rotate-file';
import util from 'util';
import { logLevels } from '../enums/Log Level.js';

const { combine, timestamp, colorize, printf, prettyPrint } = format;
// #endregion

// #region Log Manager
class LogManager {
  #logger: Logger;

  constructor() {
    const logColors = {
      EMERGENCY: 'red',
      ALERT: 'red',
      CRITICAL: 'red',
      ERROR: 'red',
      WARNING: 'yellow',
      NOTICE: 'yellow',
      INFO: 'cyan',
      DEBUG: 'magenta',
    };

    addColors(logColors);

    const customFormat = printf(({ level, message, label, timestamp }) => {
      const nLabel: string = (label as string).toUpperCase();
      const nTimestamp =
        (timestamp as string) ?? dformat(new Date(), 'yyy-mm-dd hh:mm:ss a');

      return `${nTimestamp} [${nLabel}] ${level}: ${message}`;
    });

    const winstonTransports:
      | winston.transport
      | winston.transport[]
      | undefined = [
      new winston.transports.Console({
        level: process.env.LOGGER_CONSOLE_LEVEL ?? 'DEBUG',
        silent: boolean(process.env.LOGGER_CONSOLE_SILENT),
        format: combine(customFormat, colorize({ all: true })),
      }),
    ];

    if (boolean(process.env.LOGGER_FILE_LOGGER_ENABLED) === true) {
      const fileNameLabel = process.env.LOGGER_FILE_LABEL ?? 'LOG-MANAGER';
      const dailyLogTransport = new DailyRotateFile({
        level: process.env.LOGGER_FILE_LEVEL ?? 'DEBUG',
        frequency: '1m',
        filename: `./logs/${fileNameLabel}-%DATE%`,
        extension: '.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '1g',
        maxFiles: '14d',
      });

      winstonTransports.push(dailyLogTransport);
    }

    this.#logger = winston.createLogger({
      exitOnError: false,
      levels: logLevels as winston.config.AbstractConfigSetLevels,
      format: winston.format.combine(
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        prettyPrint()
      ),
      transports: winstonTransports,
    });
  }

  #logMessage(level: string, message: string, ...optionalParams: unknown[]) {
    let extraMessage = '';
    optionalParams.forEach((op, opIndex) => {
      if (typeof op === 'object') {
        extraMessage += util.inspect(op, {
          depth: null,
          colors: true,
          numericSeparator: true,
        });
      } else {
        extraMessage += op;
      }

      if (opIndex >= 1 && opIndex < optionalParams.length - 1) {
        extraMessage += ' ';
      }
    });

    this.#logger.log({
      label: process.env.LOGGER_LABEL ?? 'LOG MANAGER',
      level,
      message: `${message}${extraMessage}`,
    });
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('DEBUG', message, ...optionalParams);
  }

  info(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('INFO', message, ...optionalParams);
  }

  notice(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('NOTICE', message, ...optionalParams);
  }

  warning(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('WARNING', message, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('ERROR', message, ...optionalParams);
  }

  critical(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('CRITICAL', message, ...optionalParams);
  }

  alert(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('ALERT', message, ...optionalParams);
  }

  emergency(message: string, ...optionalParams: unknown[]): void {
    this.#logMessage('EMERGENCY', message, ...optionalParams);
  }
}
// #endregion

// #region Initialize
const logManager = new LogManager();
// #endregion

// #region Exports
export { logManager, LogManager };
// #endregion
