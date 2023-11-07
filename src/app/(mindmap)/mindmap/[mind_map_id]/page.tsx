import { getMindMap } from '@/services/getMindMap'
import MindMapContainer from './components/MindMapContainer'
import styles from './page.module.scss'
import { Fieldset } from '@/components/Form/Fieldset/Fieldset'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface IMindMapProps {
  params: {
    mind_map_id: string
  }
}

export default async function MindMap({
  params: { mind_map_id },
}: IMindMapProps) {
  const session = await getServerSession(authOptions)
  const mindMap = await getMindMap({ mind_map_id })
  return (
    <>
      <div className={styles.title}>
        <h1>{mindMap.name}</h1>
      </div>

      <main className={styles.container}>
        {session?.user.id === mindMap.user_id && (
          <div className={styles.buttonContainer}>
            <Link href={`/createMindMap/${mind_map_id}`} passHref>
              <ButtonIcon
                variant="SECONDARY"
                title="Editar Mapa Mental"
                icon={<FontAwesomeIcon icon={faPencil} />}
              />
            </Link>
          </div>
        )}
        <MindMapContainer mindMap={mindMap} />
        <Fieldset title="Informações sobre o Mapa Mental">
          <div className={styles.infoContainer}>
            <div>
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
            <div>
              <div className={styles.info}>
                <label>Estrutura JSON utilizada:</label>
                <span>{mindMap.jsonStructure}</span>
              </div>
            </div>
          </div>
        </Fieldset>
      </main>
    </>
  )
}
