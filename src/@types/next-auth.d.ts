/* eslint-disable no-unused-vars */

import { CartData } from '@/services/cart/cart'
import { Role } from '@prisma/client'
declare module 'next-auth' {
  interface User {
    email: string
    id: string
    name: string
    role: Role
    cart: CartData | null
  }

  interface Session {
    user: User
  }
}
