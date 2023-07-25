import { Divider } from '@/components/Divider'

import styles from './styles.module.scss'

interface InformationItemProps {
  label: string
  description: string
}

export function InformationItem({ label, description }: InformationItemProps) {
  return (
    <>
      <div className={styles.container}>
        <label>{label}:</label>
        <span>{description}</span>
      </div>
      <Divider width={100} />
    </>
  )
}
