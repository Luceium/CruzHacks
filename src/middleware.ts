import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

// middleware --> routes under /protected or /admin are now protected...
export const config = {
    matcher: ["/.+"],
};