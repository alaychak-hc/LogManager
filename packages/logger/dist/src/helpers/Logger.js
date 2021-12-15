"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _LogManager_instances, _LogManager_logger, _LogManager_logMessage;
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const winston_1 = __importStar(require("winston"));
const boolean_1 = require("boolean");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const util_1 = __importDefault(require("util"));
const Log_Level_1 = require("../enums/Log Level");
const { combine, timestamp, colorize, printf, prettyPrint } = winston_1.format;
class LogManager {
    constructor() {
        _LogManager_instances.add(this);
        _LogManager_logger.set(this, void 0);
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
        winston_1.default.addColors(logColors);
        const customFormat = printf(({ level, message, label, timestamp }) => {
            var _a, _b;
            const nLabel = (_a = label) !== null && _a !== void 0 ? _a : 'CARETRACKER FHIR API';
            const nTimestamp = (_b = timestamp) !== null && _b !== void 0 ? _b : (0, date_fns_1.format)(new Date(), 'yyy-mm-dd hh:mm:ss a');
            return `${nTimestamp} [${nLabel}] ${level}: ${message}`;
        });
        const dailyLogTransport = new winston_daily_rotate_file_1.default({
            level: 'DEBUG',
            frequency: '1m',
            filename: './logs/CARETRACKER-FHIR-API-%DATE%',
            extension: '.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '1g',
            maxFiles: '14d',
        });
        __classPrivateFieldSet(this, _LogManager_logger, winston_1.default.createLogger({
            exitOnError: false,
            levels: Log_Level_1.logLevels,
            format: winston_1.default.format.combine(timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), prettyPrint()),
            transports: [
                new winston_1.default.transports.Console({
                    level: 'DEBUG',
                    silent: (0, boolean_1.boolean)(process.env.LOGGER_CONSOLE_SILENT),
                    format: combine(customFormat, colorize({ all: true })),
                }),
                dailyLogTransport,
            ],
        }), "f");
    }
    debug(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'DEBUG', message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'INFO', message, ...optionalParams);
    }
    notice(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'NOTICE', message, ...optionalParams);
    }
    warning(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'WARNING', message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'ERROR', message, ...optionalParams);
    }
    critical(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'CRITICAL', message, ...optionalParams);
    }
    alert(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'ALERT', message, ...optionalParams);
    }
    emergency(message, ...optionalParams) {
        __classPrivateFieldGet(this, _LogManager_instances, "m", _LogManager_logMessage).call(this, 'EMERGENCY', message, ...optionalParams);
    }
}
_LogManager_logger = new WeakMap(), _LogManager_instances = new WeakSet(), _LogManager_logMessage = function _LogManager_logMessage(level, message, ...optionalParams) {
    let extraMessage = '';
    optionalParams.forEach((op) => {
        if (typeof op === 'object') {
            extraMessage += util_1.default.inspect(op, { depth: null });
        }
        else {
            extraMessage += op;
        }
    });
    __classPrivateFieldGet(this, _LogManager_logger, "f").log({
        level,
        message: `${message}${extraMessage}`,
    });
};
const logManager = new LogManager();
exports.default = logManager;
//# sourceMappingURL=Logger.js.map