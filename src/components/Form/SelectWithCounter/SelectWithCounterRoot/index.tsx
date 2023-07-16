'use client'

import { ReactNode, useState } from 'react'

import { FieldError } from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'

import { Divider } from '@/components/Divider'

import styles from './styles.module.scss'
import { ErrorMessage } from '../../ErrorMessage'

interface SelectWithCounterProps {
  children: ReactNode
  label: string
  icon?: IconDefinition
  inputError?: FieldError
  inputValueToShowSummaryOfSelection: string
}

export function SelectWithCounterRoot({
  label,
  inputValueToShowSummaryOfSelection,
  inputError = undefined,
  children,
  icon: Icon,
}: SelectWithCounterProps) {
  const [isSelectionBoxOpen, setIsSelectionBoxOpen] = useState(false)

  return (
    <div>
      <div
        className={`${styles.container} ${
          isSelectionBoxOpen && styles['options-container-open']
        } ${inputError && styles['input-error']}`}
      >
        <div
          className={styles['input-container']}
          onClick={() => setIsSelectionBoxOpen((state) => !state)}
        >
          <div className={styles['primary-input-container']}>
            <div className={styles['label-container']}>
              {Icon && <FontAwesomeIcon icon={Icon} />}
              <label>{label}</label>
            </div>
            <input
              type="text"
              placeholder="Selecione"
              disabled={true}
              value={inputValueToShowSummaryOfSelection}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div
          className={`${styles['options-container']} ${
            isSelectionBoxOpen && styles['options-container-open']
          }`}
        >
          <Divider />
          <div className={styles.options}>{children}</div>
        </div>
      </div>
      {inputError !== undefined && (
        <ErrorMessage errorMessage={inputError.message} />
      )}
    </div>
  )
}
