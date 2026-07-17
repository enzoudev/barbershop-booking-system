import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest)  {
    console.log("Middleware rodando para:", req.nextUrl.pathname);
    const token = req.cookies.get('token')?.value;
    console.log("Token detectado no middleware:", token);
    const path = req.nextUrl.pathname;



    const protectedRoutes = ['/perfil', '/dashboard','/schedules', '/scheduling'];

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

    if(isProtectedRoute) {
        if(!token) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.next()

    } catch(err) {
        return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/perfil', '/perfil/:path*',
    '/dashboard', '/dashboard/:path*',
    '/schedules', '/schedules/:path*',
    '/scheduling', '/scheduling/:path*'
  ],
};