import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

interface IUserServiceResponse {
  getUsers(): Promise<User[]>
}

export default function userService(): IUserServiceResponse {
  async function getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany()

    return users
  }

  return {
    getUsers,
  }
}
