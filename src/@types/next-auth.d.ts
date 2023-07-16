/* eslint-disable no-unused-vars */

import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    email: string
    id: string
    name: string
  }

  interface Session {
    user: User
  }
}
