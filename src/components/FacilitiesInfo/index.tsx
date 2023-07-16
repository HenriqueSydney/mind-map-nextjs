import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import styles from './styles.module.scss'

interface FacilitiesInfoProps {
  icon: IconDefinition
  title: string
}

export function FacilitiesInfo({ icon, title }: FacilitiesInfoProps) {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={icon} />
      <strong>{title}</strong>
    </div>
  )
}
