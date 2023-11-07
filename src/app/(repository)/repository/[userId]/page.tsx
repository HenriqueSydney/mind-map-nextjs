import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

import { MainButtonIcons } from '@/components/Buttons/MainButtonIcons'

import styles from './page.module.scss'
import Link from 'next/link'
import { SearchForm } from './components/SearchForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import mindMapsService from '@/services/mindMapsServices'

interface IRepositoryProps {
  params: {
    userId: string
  }
}

export default async function Repository({
  params: { userId },
}: IRepositoryProps) {
  const session = await getServerSession(authOptions)
  const { getMindMapsByUserId } = mindMapsService()
  const userMindMaps = await getMindMapsByUserId(userId)
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
