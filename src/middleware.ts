import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

// middleware --> routes under /protected or /admin are now protected...
export const config = {
    matcher: "/((?!manifest.json|sw.js|logo72x72|logo192x192|logo384x384|logo512x512|api|favicon.ico).+)",
};