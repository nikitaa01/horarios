import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session }, error } = await supabase.auth.getSession()

  if (session === null || error) {
    return NextResponse.redirect(`${process.env.LOCAL_URL ?? 'http://localhost:3000'}/auth/login`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/'
}