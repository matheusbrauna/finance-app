import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const rawReq: any = req
  const token = await getToken({
    req: rawReq,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (token) {
    return NextResponse.next()
  }

  return NextResponse.redirect(`/login?callbackUrl=${req.url}`)
}
