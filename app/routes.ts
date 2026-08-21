import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [index("routes/home.tsx"),
    route("/plans", "routes/plans.tsx"),
    route("/payment", "routes/payment.tsx"),
    route("/success", "routes/success.tsx"),
    route("/otp", "routes/otp.tsx"),
    route("/sms", "routes/sms.tsx"),
    route("*", "routes/not-found.tsx")

] satisfies RouteConfig
