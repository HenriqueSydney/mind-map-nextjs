import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { env } from '@/env'
import { escapeString } from '@/utils/escapeString'
import { checkJsonString } from '@/utils/checkJsonString'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }

    const permittedAccounts = env.PERMISSION_ACCOUNTS.split(',')

    if (!permittedAccounts.includes(session.user.email)) {
      return NextResponse.json(
        { message: 'User do not have permission' },
        { status: 400 },
      )
    }

    const createMindMapParamsSchema = z.object({
      category: z
        .string({
          required_error: 'A classificação é obrigatória',
        })
        .nonempty({ message: 'A classificação é obrigatória' }),
      name: z
        .string({
          required_error: 'Nome do mapa mental é obrigatório',
        })
        .nonempty({ message: 'Nome do mapa mental é obrigatório' }),
      context: z
        .string({
          required_error: 'Contexto para criação do mapa mental é obrigatório',
        })
        .nonempty({
          message: 'Contexto para criação do mapa mental é obrigatório',
        }),
      summary: z.string().nullable(),
      jsonStructure: z
        .string({
          required_error: 'Estrutura JSON é obrigatório',
        })
        .nonempty({ message: 'Estrutura JSON é obrigatório' }),
    })

    const { category, context, name, jsonStructure, summary } =
      createMindMapParamsSchema.parse(await request.json())

    const isJsonValid = checkJsonString(jsonStructure)

    if (!isJsonValid) {
      return NextResponse.json(
        { message: 'Invalid JSON Structure' },
        { status: 400 },
      )
    }

    const newMindMap = await prisma.brainMap.create({
      data: {
        category,
        context: escapeString(context),
        name,
        jsonStructure: escapeString(jsonStructure),
        summary: summary ? escapeString(summary) : null,
        user_id: session.user.id,
      },
    })

    return NextResponse.json(newMindMap, { status: 201 })
  } catch (error) {
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }

    const permittedAccounts = env.PERMISSION_ACCOUNTS.split(',')

    if (!permittedAccounts.includes(session.user.email)) {
      return NextResponse.json(
        { message: 'User do not have permission' },
        { status: 400 },
      )
    }

    const createMindMapParamsSchema = z.object({
      category: z
        .string({
          required_error: 'A classificação é obrigatória',
        })
        .nonempty({ message: 'A classificação é obrigatória' }),
      name: z
        .string({
          required_error: 'Nome do mapa mental é obrigatório',
        })
        .nonempty({ message: 'Nome do mapa mental é obrigatório' }),
      context: z
        .string({
          required_error: 'Contexto para criação do mapa mental é obrigatório',
        })
        .nonempty({
          message: 'Contexto para criação do mapa mental é obrigatório',
        }),
      summary: z.string().nullable(),
      jsonStructure: z
        .string({
          required_error: 'Estrutura JSON é obrigatório',
        })
        .nonempty({ message: 'Estrutura JSON é obrigatório' }),
      mindMapId: z.string({
        required_error: 'ID do mapa não informado',
      }),
    })

    const { category, context, name, jsonStructure, summary, mindMapId } =
      createMindMapParamsSchema.parse(await request.json())

    const isJsonValid = checkJsonString(jsonStructure)

    if (!isJsonValid) {
      return NextResponse.json(
        { message: 'Invalid JSON Structure' },
        { status: 400 },
      )
    }

    const mindMapInfo = await prisma.brainMap.findFirst({
      where: {
        id: String(mindMapId),
      },
    })

    if (!mindMapInfo) {
      return NextResponse.json(
        { message: 'Mindmap not found' },
        { status: 400 },
      )
    }

    if (mindMapInfo.user_id !== session.user.id) {
      return NextResponse.json(
        { message: 'User not allowed to update another user Mindmap' },
        { status: 400 },
      )
    }

    const newMindMap = await prisma.brainMap.update({
      data: {
        category,
        context: escapeString(context),
        name,
        jsonStructure: escapeString(jsonStructure),
        summary: summary ? escapeString(summary) : null,
        user_id: session.user.id,
      },
      where: {
        id: String(mindMapId),
      },
    })

    return NextResponse.json(newMindMap, { status: 200 })
  } catch (error) {
    return NextResponse.json(null, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }

    const permittedAccounts = env.PERMISSION_ACCOUNTS.split(',')

    if (!permittedAccounts.includes(session.user.email)) {
      return NextResponse.json(
        { message: 'User do not have permission' },
        { status: 400 },
      )
    }

    const createMindMapParamsSchema = z.object({
      mindMapId: z.string({
        required_error: 'ID do mapa não informado',
      }),
    })

    const { mindMapId } = createMindMapParamsSchema.parse(await request.json())

    const mindMapInfo = await prisma.brainMap.findFirst({
      where: {
        id: String(mindMapId),
      },
    })

    if (!mindMapInfo) {
      return NextResponse.json(
        { message: 'Mindmap not found' },
        { status: 400 },
      )
    }

    if (mindMapInfo.user_id !== session.user.id) {
      return NextResponse.json(
        { message: 'User not allowed to update another user Mindmap' },
        { status: 400 },
      )
    }

    const newMindMap = await prisma.brainMap.delete({
      where: {
        id: String(mindMapId),
      },
    })

    return NextResponse.json(newMindMap, { status: 200 })
  } catch (error) {
    return NextResponse.json(null, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const mindMapId = searchParams.get('mindMapId')

  if (userId) {
    const userMindMaps = await prisma.brainMap.findMany({
      where: {
        user_id: String(userId),
      },
    })

    return NextResponse.json(userMindMaps, { status: 200 })
  }

  if (mindMapId) {
    const mindMap = await prisma.brainMap.findUnique({
      where: {
        id: String(mindMapId),
      },
    })

    return NextResponse.json(mindMap, { status: 200 })
  }

  return NextResponse.json('Not found', { status: 400 })
}
