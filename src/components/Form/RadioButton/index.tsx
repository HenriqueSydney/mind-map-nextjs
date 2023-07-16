import { ReactNode } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'

import styles from './styles.module.scss'

interface RadioButtonProps extends RadioGroup.RadioGroupItemProps {
  title: string
  icon?: ReactNode
}

export function RadioButton({
  title,
  icon: Icon = null,
  value,
}: RadioButtonProps) {
  return (
    <RadioGroup.Item className={styles.container} value={value}>
      {Icon && Icon}
      {title}
    </RadioGroup.Item>
  )
}
