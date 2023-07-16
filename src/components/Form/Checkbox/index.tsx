import React, { ForwardRefRenderFunction, forwardRef } from 'react'

import { FieldError } from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import * as RadixCheckbox from '@radix-ui/react-checkbox'

import { ErrorMessage } from '../ErrorMessage'

import styles from './styles.module.scss'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
}

const baseCheckbox: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = ({ label, error, name, ...rest }, ref) => {
  return (
    <>
      <div className={styles.container}>
        <RadixCheckbox.Root
          className={styles.CheckboxRoot}
          defaultChecked
          id={`root_${name}`}
          name={name}
        >
          <RadixCheckbox.Indicator
            className={styles.CheckboxIndicator}
            {...rest}
          >
            <FontAwesomeIcon icon={faCheck} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <label className={styles.label} htmlFor={`root_${name}`}>
          {label}
        </label>
      </div>
      <ErrorMessage errorMessage={error?.message} />
    </>
  )
}

export const Checkbox = forwardRef(baseCheckbox)
