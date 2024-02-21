export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard",
        "/guests/new-guest",
    ]
}