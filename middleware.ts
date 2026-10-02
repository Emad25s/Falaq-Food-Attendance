import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, getAdminSession } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic =
    pathname === '/login' ||
    pathname === '/api/auth/login' ||
    pathname === '/api/auth/logout' ||
    pathname === '/team-lead' ||
    pathname.startsWith('/api/team-lead/') ||
    pathname === '/api/user-panel/login' ||
    pathname === '/api/user-panel/logout' ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    /\.(?:svg|png|jpe?g|webp|ico)$/i.test(pathname);

  if (isPublic) return NextResponse.next();

  const session = await getAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  const isUserPanel = pathname === '/user-panel';
  const isUserPanelApi = pathname.startsWith('/api/user-panel/');

  if (isUserPanel) {
    if (session?.role === 'admin') return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  if (!session) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isUserPanelApi) {
    return session.role === 'department_head'
      ? NextResponse.next()
      : NextResponse.json({ error: 'Department head access required.' }, { status: 403 });
  }

  if (pathname.startsWith('/api/')) {
    return session.role === 'admin'
      ? NextResponse.next()
      : NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  return session.role === 'admin'
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/user-panel', request.url));
}