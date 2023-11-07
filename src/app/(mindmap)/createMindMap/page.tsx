import { authOptions } from '@/lib/auth'
import { CreateMindMapForm } from './components/CreateMindMapForm'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function CreateMindMap() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <main className={styles.container}>
        <CreateMindMapForm userId={session.user.id} />
      </main>
    </>
  )
}
