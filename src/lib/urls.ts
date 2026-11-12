// Public URLs for Basher.
// Marketing site lives at onbasher.onsuite.in; the authenticated app is on app.onbasher.onsuite.in.
//
// Local dev: set these in .env.local to point CTAs at your local dev servers.
//   NEXT_PUBLIC_ONSUITE_APP_URL → onsuite-app (sign-in / sign-up via the platform shell)
//   NEXT_PUBLIC_ONBASHER_APP_URL → onbasher-app (Open App)
export const PLATFORM_URL = process.env.NEXT_PUBLIC_ONSUITE_APP_URL || 'https://app.onsuite.in';
export const APP_URL = process.env.NEXT_PUBLIC_ONBASHER_APP_URL || 'https://app.onbasher.onsuite.in';

export const SIGN_IN_URL = `${PLATFORM_URL}/sso/onbasher`;
export const SIGN_UP_URL = `${PLATFORM_URL}/signup`;
export const OPEN_APP_URL = `${APP_URL}/home`;
