import type { NextRequest } from 'next/server'

import { defaultLoginRedirect, publicRoutes } from './config/routes'

export const middleware = (req: NextRequest) => {
    const { nextUrl } = req

    const isLoggedIn = !!req.cookies.get('token')?.value

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = nextUrl.pathname === '/login'

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
        }
        return undefined
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl))
    }

    return undefined
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)'
    ]
}

export default middleware
