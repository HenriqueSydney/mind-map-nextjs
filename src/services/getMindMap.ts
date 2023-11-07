import { IMindMap } from '@/dto/mindMapDTO'

interface IGetUserMindMapsParams {
  mind_map_id: string
}

export async function getMindMap({
  mind_map_id,
}: IGetUserMindMapsParams): Promise<IMindMap> {
  const mindMap = await fetch(`/api/mindmap?mindMapId=${mind_map_id}`, {
    cache: 'no-store',
  })
  if (!mindMap.ok) {
    throw new Error('MindMaps not found')
  }

  return mindMap.json()
}
