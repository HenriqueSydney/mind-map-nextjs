import React, { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

import InputMask from 'react-input-mask'

import { ErrorMessage } from '../ErrorMessage'

import styles from './styles.module.scss'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string
  label?: string
  error?: FieldError
}

const InputWithMaskBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputTextProps
> = ({ mask, label = '', error = null, ...rest }, ref) => {
  return (
    <div className={styles['input-container']}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles['input-wrapper']}>
        <InputMask
          type="text"
          className={`${styles['input-container']} ${
            !!error?.message && styles['input-error']
          }`}
          mask={mask}
          ref={ref}
          {...rest}
        />
      </div>
      <ErrorMessage errorMessage={error?.message} />
    </div>
  )
}

export const InputTextWithMask = forwardRef(InputWithMaskBase)
