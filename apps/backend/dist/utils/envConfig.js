"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envalid_1 = require("envalid");
dotenv_1.default.config();
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)({ devDefault: (0, envalid_1.testOnly)("test"), choices: ["development", "production", "test"] }),
    HOST: (0, envalid_1.host)({ devDefault: (0, envalid_1.testOnly)("localhost") }),
    PORT: (0, envalid_1.port)({ devDefault: (0, envalid_1.testOnly)(3000) }),
    CORS_ORIGIN: (0, envalid_1.str)({ devDefault: (0, envalid_1.testOnly)("http://localhost:3000") }),
    COMMON_RATE_LIMIT_MAX_REQUESTS: (0, envalid_1.num)({ devDefault: (0, envalid_1.testOnly)(1000) }),
    COMMON_RATE_LIMIT_WINDOW_MS: (0, envalid_1.num)({ devDefault: (0, envalid_1.testOnly)(1000) }),
});
//# sourceMappingURL=envConfig.js.map