import { decrypt, users } from '#/lib/auth';
import { protectedRoutes } from '#/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const excludePattern = /^\/(?!api\/public|_next\/static|_next\/image|images|favicon.ico).*/;
  
  if (!excludePattern.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const isRootRoute = request.nextUrl.pathname === '/';
	const session = request.cookies.get('session')?.value;
  // console.log('Middleware Session :>>', session);

  if (isRootRoute || !protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    const url = request.nextUrl.clone();
    url.searchParams.set('next', url.pathname);
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // Verify session...
  const parsedSession = await decrypt(session) as { user: { email: string; password: string } };
  const validUser = users.find($ => $.email === parsedSession.user.email && $.password === parsedSession.user.password);

  // console.log('Parsed Session :>>', parsedSession);

  if (!parsedSession) {
    const url = request.nextUrl.clone();
    url.searchParams.set('next', url.pathname);
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
