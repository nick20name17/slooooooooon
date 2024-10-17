import type { NextRequest } from 'next/server'

import { defaultLoginRedirect, publicRoutes } from './config/routes'

const matchRoute = (path: string, route: string) => {
    const pathSegments = path.split('/').filter(Boolean)
    const routeSegments = route.split('/').filter(Boolean)

    if (pathSegments.length !== routeSegments.length) return false

    return routeSegments.every(
        (segment, i) => segment === pathSegments[i] || segment.startsWith(':') //
    )
}

export const middleware = (req: NextRequest) => {
    const { nextUrl } = req

    const isLoggedIn = !!req.cookies.get('token')?.value

    const isPublicRoute = publicRoutes.some((route) =>
        matchRoute(nextUrl.pathname, route)
    )

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
