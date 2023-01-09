// #region Developer Information
/*
 ********************************************
    Author: Andrew Laychak
    Email: ALaychak@harriscomputer.com

    Created At: 05-18-2022 09:03:54 PM
    Last Modified: 01-09-2023 11:32:10 AM
    Last Updated By: Andrew Laychak

    Description: Log levels for the logger.

    References:
      - None
 ********************************************
*/
// #endregion

// #region Log Levels
export enum LogLevel {
  EMERGENCY = 'EMERGENCY',
  ALERT = 'ALERT',
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
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
