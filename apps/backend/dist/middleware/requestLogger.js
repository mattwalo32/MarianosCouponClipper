"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const http_status_codes_1 = require("http-status-codes");
const pino_http_1 = require("pino-http");
const envConfig_1 = require("../utils/envConfig");
var LogLevel;
(function (LogLevel) {
    LogLevel["Fatal"] = "fatal";
    LogLevel["Error"] = "error";
    LogLevel["Warn"] = "warn";
    LogLevel["Info"] = "info";
    LogLevel["Debug"] = "debug";
    LogLevel["Trace"] = "trace";
    LogLevel["Silent"] = "silent";
})(LogLevel || (LogLevel = {}));
const requestLogger = (options) => {
    const pinoOptions = {
        enabled: envConfig_1.env.isProduction,
        customProps: customProps,
        redact: [],
        genReqId,
        customLogLevel,
        customSuccessMessage,
        customReceivedMessage: (req) => `request received: ${req.method}`,
        customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`,
        customAttributeKeys,
        ...options,
    };
    return [responseBodyMiddleware, (0, pino_http_1.pinoHttp)(pinoOptions)];
};
const customAttributeKeys = {
    req: "request",
    res: "response",
    err: "error",
    responseTime: "timeTaken",
};
const customProps = (req, res) => ({
    request: req,
    response: res,
    error: res.locals.err,
    responseBody: res.locals.responseBody,
});
const responseBodyMiddleware = (_req, res, next) => {
    const isNotProduction = !envConfig_1.env.isProduction;
    if (isNotProduction) {
        const originalSend = res.send;
        res.send = (content) => {
            res.locals.responseBody = content;
            res.send = originalSend;
            return originalSend.call(res, content);
        };
    }
    next();
};
const customLogLevel = (_req, res, err) => {
    if (err || res.statusCode >= http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        return LogLevel.Error;
    if (res.statusCode >= http_status_codes_1.StatusCodes.BAD_REQUEST)
        return LogLevel.Warn;
    if (res.statusCode >= http_status_codes_1.StatusCodes.MULTIPLE_CHOICES)
        return LogLevel.Silent;
    return LogLevel.Info;
};
const customSuccessMessage = (req, res) => {
    if (res.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND)
        return (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND);
    return `${req.method} completed`;
};
const genReqId = (req, res) => {
    const existingID = req.id ?? req.headers["x-request-id"];
    if (existingID)
        return existingID;
    const id = (0, node_crypto_1.randomUUID)();
    res.setHeader("X-Request-Id", id);
    return id;
};
exports.default = requestLogger();
//# sourceMappingURL=requestLogger.js.map