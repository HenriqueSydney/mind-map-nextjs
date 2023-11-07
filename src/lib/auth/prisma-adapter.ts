import { Adapter } from 'next-auth/adapters'
import prisma from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createSession({ expires, sessionToken, userId }) {
      const session = await prisma.session.create({
        data: {
          expires,
          session_token: sessionToken,
          user_id: userId,
        },
      })

      return {
        expires: session.expires,
        sessionToken: session.session_token,
        userId: session.user_id,
      }
    },

    async createUser({ email, name }) {
      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userExists) {
        const updatedUser = await prisma.user.update({
          data: {
            email,
            name,
          },
          where: { id: userExists.id },
        })

        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          email: updatedUser.email!,
          emailVerified: null,
          id: updatedUser.id,
          name: updatedUser.name,
          role: updatedUser.role,
        }
      }

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      })

      return {
        email: newUser.email,
        emailVerified: null,
        id: newUser.id,
        name: newUser.name,
        role: newUser.role,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        include: {
          user: true,
        },
        where: {
          session_token: sessionToken,
        },
      })

      if (!session) {
        return null
      }

      const { expires, session_token, user, user_id } = session

      return {
        session: {
          expires,
          sessionToken: session_token,
          userId: user_id,
        },
        user: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          email: user.email!,
          emailVerified: null,
          id: user.id,
          name: user.name,
          role: user.role,
        },
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: user.email!,
        emailVerified: null,
        id: user.id,
        name: user.name,
        role: user.role,
      }
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        include: {
          user: true,
        },
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: user.email!,
        emailVerified: null,
        id: user.id,
        name: user.name,
        role: user.role,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: user.email!,
        emailVerified: null,
        id: user.id,
        name: user.name,
        role: user.role,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          scope: account.scope,
          session_state: account.session_state,
          token_type: account.token_type,
          type: account.type,
          user_id: account.userId,
        },
      })
    },

    async updateSession({ expires, sessionToken, userId }) {
      const session = await prisma.session.update({
        data: {
          expires,
          user_id: userId,
        },
        where: {
          session_token: sessionToken,
        },
      })

      return {
        expires: session.expires,
        sessionToken: session.session_token,
        userId: session.user_id,
      }
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        data: {
          email: user.email,
          name: user.name,
        },
        where: { id: user.id },
      })

      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: updatedUser.email!,
        emailVerified: null,
        id: updatedUser.id,
        name: updatedUser.name,
        role: updatedUser.role,
      }
    },
  }
}
