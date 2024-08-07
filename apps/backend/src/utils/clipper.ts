import axios from "axios"

const api = axios.create({
    baseURL: "https://www.marianos.com/atlas/v1",
    timeout: 10000,
    headers: {
        "X-Kroger-Channel": "WEB",
        "User-Agent": "PostmanRuntime/7.40.0",
    }
})

export interface AuthContext {
    Location: string
    Cookie: string
}

export const clipCoupons = async (ctx: AuthContext) => {
    const unclipped = await getUnclippedCoupons(ctx)
    console.log(unclipped)
}

interface Coupon {

}

const getUnclippedCoupons = async (ctx: AuthContext): Promise<Coupon> => {
    const coupons = await api.get("savings-coupons/v1/coupons?projections=coupons.compact&filter.status=unclipped&page.size=24&page.offset=0", {
        headers: {
            "Cookie": ctx.Cookie,
            "X-Laf-Object": ctx.Location,
        }
    })

    return coupons.data
}