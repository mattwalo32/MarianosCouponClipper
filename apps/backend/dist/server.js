"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const pino_1 = require("pino");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const rateLimiter_1 = __importDefault(require("./middleware/rateLimiter"));
const requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
const envConfig_1 = require("./utils/envConfig");
const logger = (0, pino_1.pino)({ name: "server start" });
exports.logger = logger;
const app = (0, express_1.default)();
exports.app = app;
app.set("trust proxy", true);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: envConfig_1.env.CORS_ORIGIN, credentials: true }));
app.use((0, helmet_1.default)());
app.use(rateLimiter_1.default);
app.use(requestLogger_1.default);
app.use((0, errorHandler_1.default)());
//# sourceMappingURL=server.js.map