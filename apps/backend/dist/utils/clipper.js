"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clipCoupons = void 0;
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: "https://www.marianos.com/atlas/v1",
    timeout: 10000,
    headers: {
        "X-Kroger-Channel": "WEB",
        "User-Agent": "PostmanRuntime/7.40.0",
    }
});
const clipCoupons = async (ctx) => {
    const unclipped = await getUnclippedCoupons(ctx);
    console.log(unclipped);
};
exports.clipCoupons = clipCoupons;
const getUnclippedCoupons = async (ctx) => {
    const coupons = await api.get("savings-coupons/v1/coupons?projections=coupons.compact&filter.status=unclipped&page.size=24&page.offset=0", {
        headers: {
            "Cookie": ctx.Cookie,
            "X-Laf-Object": ctx.Location,
        }
    });
    return coupons.data;
};
//# sourceMappingURL=clipper.js.map