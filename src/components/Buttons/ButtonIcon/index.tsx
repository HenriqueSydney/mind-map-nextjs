import React, { ForwardRefRenderFunction, forwardRef } from 'react'

import styles from './styles.module.scss'
import { ClipLoader } from 'react-spinners'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: any
  title?: string
  children?: React.ReactNode
  variant?: 'PRIMARY' | 'SECONDARY'
  numberOfItems?: number
  isSubmitting?: boolean
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    icon = '',
    title = '',
    variant = 'PRIMARY',
    children = '',
    disabled = false,
    isSubmitting = false,
    ...rest
  },
  ref,
) => {
  const variantColor = variant === 'PRIMARY' ? styles.primary : styles.secondary
  return (
    <button
      className={`${styles.container} ${variantColor}`}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {isSubmitting && <ClipLoader color="#F0F0F0" size={24} />}
      {icon && !disabled && icon}
      {title && !disabled && title}
      {children && !disabled && children}
    </button>
  )
}

export const ButtonIcon = forwardRef(ButtonBase)
