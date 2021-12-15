"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logLevels = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["EMERGENCY"] = "EMERGENCY";
    LogLevel["ALERT"] = "ALERT";
    LogLevel["CRITICAL"] = "CRITICAL";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["NOTICE"] = "NOTICE";
    LogLevel["INFO"] = "INFO";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.logLevels = {};
let lLevelIndex = 0;
Object.entries(LogLevel).forEach(([level]) => {
    exports.logLevels[level] = lLevelIndex;
    lLevelIndex += 1;
});
exports.default = LogLevel;
//# sourceMappingURL=Log%20Level.js.map