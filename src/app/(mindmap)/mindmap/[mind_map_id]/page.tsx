import MindMapContainer from './components/MindMapContainer'
import styles from './page.module.scss'
import { Fieldset } from '@/components/Form/Fieldset/Fieldset'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import mindMapsService from '@/services/mindMapsServices'
import { redirect } from 'next/navigation'

interface IMindMapProps {
  params: {
    mind_map_id: string
  }
}

export default async function MindMap({
  params: { mind_map_id },
}: IMindMapProps) {
  const session = await getServerSession(authOptions)
  const { getMindMapsById } = mindMapsService()
  const mindMap = await getMindMapsById(mind_map_id)

  if (!mindMap) {
    redirect('/')
  }

  return (
    <>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>{mindMap.name}</h1>
        </div>

        {session?.user.id === mindMap.user_id && (
          <div className={styles.buttonContainer}>
            <div className={styles.buttonWithText}>
              <Link href={`/createMindMap/${mind_map_id}`} passHref>
                <ButtonIcon
                  variant="SECONDARY"
                  title="Editar Mapa Mental"
                  icon={<FontAwesomeIcon icon={faPencil} />}
                />
              </Link>
            </div>
            <div className={styles.buttonJustIcon}>
              <Link href={`/createMindMap/${mind_map_id}`} passHref>
                <ButtonIcon
                  variant="SECONDARY"
                  icon={<FontAwesomeIcon icon={faPencil} />}
                />
              </Link>
            </div>
          </div>
        )}
        <MindMapContainer mindMap={mindMap} />
        <Fieldset title="Informações sobre o Mapa Mental">
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <label>Categoria:</label>
              <span>{mindMap.category}</span>
            </div>
            <div className={styles.info}>
              <label>Nome:</label>
              <span>{mindMap.name}</span>
            </div>
            <div className={styles.info}>
              <label>Contexto:</label>
              <span>{mindMap.context}</span>
            </div>
            <div className={styles.info}>
              <label>Resumo:</label>
              <span>{mindMap.summary}</span>
            </div>
          </div>
        </Fieldset>
      </main>
    </>
  )
}
