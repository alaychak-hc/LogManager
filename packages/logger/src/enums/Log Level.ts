// #region ESLint Rules
/* eslint-disable no-shadow */
// #endregion

/*
 ********************************************
    Author: Andrew Laychak
    Email: ALaychak@HarrisComputer.com

    Created At: 02-10-2021 11:51:39 AM
    Last Modified: 12-15-2021 09:59:47 AM
    Last Updated By: Andrew Laychak

    Description: Log levels for the logger.

    References:
      - None
 ********************************************
*/

// #region Log Levels
export enum LogLevel {
  EMERGENCY = 'EMERGENCY',
  ALERT = 'ALERT',
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  NOTICE = 'NOTICE',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

export const logLevels: Record<string, unknown> = {};

let lLevelIndex = 0;
Object.entries(LogLevel).forEach(([level]) => {
  logLevels[level] = lLevelIndex;
  lLevelIndex += 1;
});
// #endregion

// #region Exports
export default LogLevel;
// #endregion
