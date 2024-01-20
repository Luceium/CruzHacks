// from quickstart
// https://manage.auth0.com/dashboard/us/dev-ge7mucha16f8g3ib/applications/5pfiImbsAaWGT0eys1A10WVro68xJ2Bh/quickstart/nextjs
/*
This creates the following routes:

/api/auth/login: The route used to perform login with Auth0.
/api/auth/logout: The route used to log the user out.
/api/auth/callback: The route Auth0 will redirect the user to after a successful login.
/api/auth/me: The route to fetch the user profile from.

*/

// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();