import { NextAuthOptions } from 'next-auth'

import { JWT } from 'next-auth/jwt'

import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from './auth/prisma-adapter'
import { Role } from '@prisma/client'
import prisma from './prisma'

import jwt from 'jsonwebtoken'

import { env } from '@/env'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        return ''
      }

      return jwt.sign(token, secret)
    },
    async decode({ secret, token }) {
      if (!token) {
        return Promise.resolve(null)
      }

      try {
        const verifiedToken = jwt.verify(token, secret)
        return Promise.resolve(verifiedToken as JWT)
      } catch (error) {
        // Se houver um erro na verificação do token, você pode tratar o erro aqui, se necessário.
        console.error('Erro na verificação do token:', error)
        return Promise.resolve(null)
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },

    async signIn(user) {
      return true
    },

    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role
      }
      return {
        ...token,
        user,
      }
    },
  },
  pages: {
    signIn: '/',
  },
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      async profile(profile: GoogleProfile) {
        try {
          const permittedAccounts = env.PERMISSION_ACCOUNTS.split(',')

          if (!permittedAccounts.includes(profile.email)) {
            throw new Error('User do not have permission')
          }

          const user = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          })

          return {
            email: profile.email,
            id: profile.sub,
            name: profile.name,
            role: user ? user.role : Role.USER,
          }
        } catch (error) {
          throw new Error('User do not have permission')
        }
      },
    }),
  ],
}
