import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

import { MainButtonIcons } from '@/components/Buttons/MainButtonIcons'

import styles from './page.module.scss'
import Link from 'next/link'
import { SearchForm } from './components/SearchForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface IRepositoryProps {
  params: {
    userId: string
  }
}

interface IGetUserMindMapsParams {
  userId: string
}

interface IUserMindMaps {
  id: string
  name: string
}

async function getUserMindMaps({
  userId,
}: IGetUserMindMapsParams): Promise<IUserMindMaps[]> {
  const mindMaps = await fetch(`/api/mindmap?userId=${userId}`, {
    cache: 'no-store',
  })
  if (!mindMaps.ok) {
    throw new Error('MindMaps not found')
  }

  return mindMaps.json()
}

export default async function Repository({
  params: { userId },
}: IRepositoryProps) {
  const session = await getServerSession(authOptions)

  const userMindMaps = await getUserMindMaps({ userId })
  return (
    <>
      <main className={styles.container}>
        {<SearchForm isSameAuthorOfRepository={session?.user.id === userId} />}

        <div className={styles.linkContainer}>
          {userMindMaps.map(({ id, name }) => {
            return (
              <Link
                key={id}
                href={`/mindmap/${id}`}
                passHref
                className="button-link-main"
              >
                <MainButtonIcons
                  icon={<FontAwesomeIcon icon={faBrain} size="3x" />}
                  title={name}
                />
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
