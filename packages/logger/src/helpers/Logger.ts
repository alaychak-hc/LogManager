// #region ESLint Rules
/* eslint-disable no-shadow */
// #endregion

// #region Developer Information
/*
 ********************************************
    Author: Andrew Laychak
    Email: ALaychak@HarrisComputer.com

    Created At: 02-09-2021 15:33:54 PM
    Last Modified: 04-05-2022 10:25:10 PM
    Last Updated By: Andrew Laychak

    Description: Global logger that handles logging data for various sources

    References:
      - Winston: https://github.com/winstonjs/winston
 ********************************************
*/
// #endregion

// #region Imports
import { format as dformat } from 'date-fns';
import winston, { format } from 'winston';
import { boolean } from 'boolean';
import DailyRotateFile from 'winston-daily-rotate-file';
import util from 'util';
import { logLevels } from '../enums/Log Level';

const { combine, timestamp, colorize, printf, prettyPrint } = format;
// #endregion

// #region Logger
class LogManager {
  #logger: winston.Logger;

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

    winston.addColors(logColors);

    const customFormat = printf(({ level, message, label, timestamp }) => {
      const nLabel: string = (label as string) ?? 'CARETRACKER FHIR API';
      const nTimestamp =
        (timestamp as string) ?? dformat(new Date(), 'yyy-mm-dd hh:mm:ss a');

      return `${nTimestamp} [${nLabel}] ${level}: ${message}`;
    });

    const dailyLogTransport = new DailyRotateFile({
      level: 'DEBUG',
      frequency: '1m',
      filename: './logs/CARETRACKER-FHIR-API-%DATE%',
      extension: '.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '1g',
      maxFiles: '14d',
    });

    dailyLogTransport.on('new', (newFileName) => {
      console.log(newFileName);
    });

    const winstonTransports:
      | winston.transport
      | winston.transport[]
      | undefined = [
      new winston.transports.Console({
        level: 'DEBUG',
        silent: boolean(process.env.LOGGER_CONSOLE_SILENT),
        format: combine(customFormat, colorize({ all: true })),
      }),
      dailyLogTransport,
    ];

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
    optionalParams.forEach((op) => {
      if (typeof op === 'object') {
        extraMessage += util.inspect(op, { depth: null });
      } else {
        extraMessage += op;
      }
    });

    this.#logger.log({
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

const logManager = new LogManager();

// #region Exports
export default logManager;
// #endregion
