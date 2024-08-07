"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const unexpectedRequest = (_req, res) => {
    res.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
};
const addErrorToRequestLog = (err, _req, res, next) => {
    res.locals.err = err;
    next(err);
};
exports.default = () => [unexpectedRequest, addErrorToRequestLog];
//# sourceMappingURL=errorHandler.js.map