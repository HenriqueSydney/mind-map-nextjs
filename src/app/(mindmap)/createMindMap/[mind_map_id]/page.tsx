import { CreateMindMapForm } from '../components/CreateMindMapForm'
import styles from '../page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import mindMapsService from '@/services/mindMapsServices'

interface ICreateMindMapProps {
  params: {
    mind_map_id: string
  }
}

export default async function CreateMindMap({
  params: { mind_map_id },
}: ICreateMindMapProps) {
  const session = await getServerSession(authOptions)
  const { getMindMapsById } = mindMapsService()
  const mindMap = await getMindMapsById(mind_map_id)

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <main className={styles.container}>
        <CreateMindMapForm mindMap={mindMap} userId={session.user.id} />
      </main>
    </>
  )
}
