import { NextResponse } from 'next/server';

/** Build identity for `dev.sh status -p` — answers "is the deploy I just pushed actually live?".
 *  Mirrors the web apps' route; marketing has no @onsuite/lib, so there is no lib version. */
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    app: process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown',
    sha: (process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_SHA ?? 'unknown').slice(0, 7),
    built_at: process.env.NEXT_PUBLIC_BUILD_TIME ?? 'unknown',
    node: process.version,
  });
}
