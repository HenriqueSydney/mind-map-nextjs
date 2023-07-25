import { cartService } from '@/services/cart/cart'
import { NextAuthOptions } from 'next-auth'

import { JWT } from 'next-auth/jwt'

import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import FacebookProvider, { FacebookProfile } from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from './auth/prisma-adapter'
import { Role } from '@prisma/client'
import prisma from './prisma'

import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '@/env'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
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
      console.log('Usuário', user)
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
        const { getCartData } = cartService()
        const cartData = getCartData()
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          })

          if (!user) {
            throw new Error('User not registered')
          }

          return {
            email: profile.email,
            id: profile.sub,
            name: profile.name,
            role: user.role,
            cart: cartData,
          }
        } catch (error) {
          return {
            email: profile.email,
            id: profile.id,
            name: profile.name,
            role: Role.USER,
            cart: cartData,
          }
        }
      },
    }),
    FacebookProvider({
      id: 'facebook',
      name: 'Facebook',
      authorization: 'https://www.facebook.com/v11.0/dialog/oauth?scope=email',
      token: 'https://graph.facebook.com/oauth/access_token',
      userinfo: {
        url: 'https://graph.facebook.com/me',
        params: { fields: 'id,name,email' },
        async request({ tokens, client, provider }) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return await client.userinfo(tokens.access_token!, {
            // @ts-expect-error expecting to have params, but type does not included
            params: provider.userinfo?.params,
          })
        },
      },
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      async profile(profile: FacebookProfile) {
        const { getCartData } = cartService()
        const cartData = getCartData()
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          })

          if (!user) {
            throw new Error('User not registered')
          }

          return {
            email: profile.email,
            id: profile.id,
            name: profile.name,
            role: user.role,
            cart: cartData,
          }
        } catch (error) {
          return {
            email: profile.email,
            id: profile.id,
            name: profile.name,
            role: Role.USER,
            cart: cartData,
          }
        }
      },
    }),
    CredentialsProvider({
      type: 'credentials',

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('check your credentials')
          return null
        }

        const { getCartData } = cartService()
        const cartData = getCartData()
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user || !user.emailVerified || !user.hashedPassword) {
            return null
          }

          const doesPasswordMatches = await compare(
            credentials.password,
            user.hashedPassword,
          )

          if (!doesPasswordMatches) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            cart: cartData,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
}
