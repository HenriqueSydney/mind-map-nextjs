/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'

import { withAuth } from 'next-auth/middleware'
import { Role } from '@prisma/client'
import jwt_decode from 'jwt-decode'

export default withAuth(
  function middleware(request: NextRequest) {
    return NextResponse.rewrite(new URL('/admin', request.url))
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const tokenValue = req.cookies.get('next-auth.session-token')?.value
        const tokenInSession: any = tokenValue
          ? jwt_decode(tokenValue || '{}')
          : {}

        return token?.role === Role.ADMIN || tokenInSession?.role === Role.ADMIN
      },
    },
  },
)

export const config = { matcher: ['/admin'] }
