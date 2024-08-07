"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const envConfig_1 = require("../utils/envConfig");
const rateLimiter = (0, express_rate_limit_1.rateLimit)({
    legacyHeaders: true,
    limit: envConfig_1.env.COMMON_RATE_LIMIT_MAX_REQUESTS,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    windowMs: 15 * 60 * envConfig_1.env.COMMON_RATE_LIMIT_WINDOW_MS,
    keyGenerator: (req) => req.ip,
});
exports.default = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map