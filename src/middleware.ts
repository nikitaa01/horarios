import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    return NextResponse.redirect(`${process.env.LOCAL_URL}/auth/login`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/'
}