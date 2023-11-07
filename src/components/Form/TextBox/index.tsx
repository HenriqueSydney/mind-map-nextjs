'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.scss'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { Toast } from '@/components/Toast'

interface ITextBox {
  label: string
  text: string
  htmlFormatted?: boolean
  height?: number
}

export default function TextBox({
  label,
  text,
  htmlFormatted = false,
  height = 100,
}: ITextBox) {
  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text.replaceAll('<br>', '\n'))
      toast.info('Texto copiado para a área de transferência.')
    } catch {
      toast.error('Erro ao copiar o texto.')
    }
  }

  return (
    <div className={styles['box-container']} style={{ height }}>
      <div className={styles.label}>
        <label>{label}</label>
      </div>

      <div className={styles['box-wrapper']} style={{ height }}>
        <div className={styles.buttonCopyContainer}>
          <ButtonIcon
            icon={<FontAwesomeIcon icon={faCopy} size="xs" />}
            onClick={() => copyText(text)}
            type="button"
            variant="SECONDARY"
          />
        </div>
        {htmlFormatted ? (
          <span dangerouslySetInnerHTML={{ __html: text }} />
        ) : (
          <span>{text}</span>
        )}
      </div>
      <Toast />
    </div>
  )
}
