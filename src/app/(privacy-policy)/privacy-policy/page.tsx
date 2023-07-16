import { getPrivacyPolicy } from '@/services/prismic/getPrivacyPolicy'

import styles from './page.module.scss'
import cmsStyles from '@/styles/cms.module.scss'
import Skeleton from 'react-loading-skeleton'

export default async function PrivacyPolicy() {
  const privacyPolicy = await getPrivacyPolicy()

  return (
    <>
      <main className={styles.container}>
        <div className={styles.policy}>
          <div className={styles.title}>
            <h1>{privacyPolicy?.title}</h1>
            <strong>Atualizada em {privacyPolicy?.updatedAt}</strong>
          </div>

          {!privacyPolicy ? (
            <Skeleton count={20} />
          ) : (
            <div
              className={cmsStyles.postContent}
              dangerouslySetInnerHTML={{
                __html: privacyPolicy.content,
              }}
            />
          )}
        </div>
      </main>
    </>
  )
}
