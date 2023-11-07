import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonDressBurst, faUser } from '@fortawesome/free-solid-svg-icons'

import { MainButtonIcons } from '@/components/Buttons/MainButtonIcons'

import styles from './page.module.scss'
import Link from 'next/link'
import userService from '@/services/userServices'

export default async function Home() {
  const { getUsers } = userService()
  const users = await getUsers()

  return (
    <>
      <main className={styles.container}>
        <div className={styles.linkContainer}>
          {users.map(({ id, name }) => {
            const splittedName = name?.split(' ')
            return (
              <Link
                key={id}
                href={`/repository/${id}`}
                passHref
                className="button-link-main"
              >
                <MainButtonIcons
                  icon={
                    splittedName && splittedName[0] === 'Felipe' ? (
                      <FontAwesomeIcon icon={faPersonDressBurst} size="3x" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} size="3x" />
                    )
                  }
                  title={
                    splittedName && splittedName[0] === 'Felipe'
                      ? 'Bebê Lindinho'
                      : splittedName
                      ? `${splittedName[0]} ${
                          splittedName[splittedName.length - 1]
                        }`
                      : 'Unknown'
                  }
                />
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
