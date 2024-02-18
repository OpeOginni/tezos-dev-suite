import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { db } from './server/db'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {

        const adminAddress = request.nextUrl.pathname.split('/')[2]

        const admin = await db.admin.findUnique({
            where: {
                adminAddress: adminAddress,
            }
        })

        if (!admin) return NextResponse.rewrite(new URL('/sign-up', request.url))
    }
}