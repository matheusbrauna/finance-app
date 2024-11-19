import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  // 1. Check if route is protected
  const protectedRoutes = ['/']
  const currentPath = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(currentPath)

  if (isProtectedRoute) {
    // 2. Check for valid session
    const cookiesStore = await cookies()
    const session = cookiesStore.get('better-auth.session_token')?.value

    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
