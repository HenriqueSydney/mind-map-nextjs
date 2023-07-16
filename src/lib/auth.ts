import { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import FacebookProvider, { FacebookProfile } from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from './auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },

    async signIn({ account }) {
      return true
    },

    async jwt({ token, user }) {
      return {
        ...token,
        user,
      }
    },
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
      profile(profile: GoogleProfile) {
        return {
          email: profile.email,
          id: profile.sub,
          name: profile.name,
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
            // @ts-expect-error
            params: provider.userinfo?.params,
          })
        },
      },
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      profile(profile: FacebookProfile) {
        return {
          email: profile.email,
          id: profile.id,
          name: profile.name,
        }
      },
    }),
    CredentialsProvider({
      type: 'credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('check your credentials')
          return null
        }

        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        }

        const resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentialDetails),
        })
        const user = await resp.json()
        if (user.is_success) {
          return user
        } else {
          console.log('check your credentials')
          return null
        }
      },
    }),
  ],
}
