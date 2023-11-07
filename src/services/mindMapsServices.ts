import prisma from '@/lib/prisma'
import { BrainMap } from '@prisma/client'

interface IMindMapsServiceResponse {
  getMindMapsByUserId(userId: string): Promise<BrainMap[]>
  getMindMapsById(mindMapId: string): Promise<BrainMap | null>
}

export default function mindMapsService(): IMindMapsServiceResponse {
  async function getMindMapsByUserId(userId: string): Promise<BrainMap[]> {
    const userMindMaps = await prisma.brainMap.findMany({
      where: {
        user_id: String(userId),
      },
    })

    return userMindMaps
  }

  async function getMindMapsById(mindMapId: string): Promise<BrainMap | null> {
    const mindMap = await prisma.brainMap.findUnique({
      where: {
        id: String(mindMapId),
      },
    })

    return mindMap
  }

  return {
    getMindMapsByUserId,
    getMindMapsById,
  }
}
