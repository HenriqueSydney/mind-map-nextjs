'use client'

import { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'
import { useFormContext } from 'react-hook-form'

interface ItemsCounterProps {
  itemId: string
  initialValue?: number
}

export function ItemsCounter({ itemId, initialValue = 0 }: ItemsCounterProps) {
  const { register, getValues, setValue } = useFormContext()

  function handleDecreaseValue() {
    const currentValue = getValues(itemId) || initialValue
    const newValue = currentValue - 1 >= 0 ? currentValue - 1 : 0
    setValue(itemId, newValue)
  }

  function handleIncreaseValue() {
    const currentValue = getValues(itemId) || initialValue
    const newValue = currentValue + 1
    setValue(itemId, newValue)
  }

  useEffect(() => {
    const initialItemQuantity = getValues(itemId)
    setValue(itemId, initialItemQuantity || initialValue)
  }, [getValues, itemId, setValue, initialValue])

  const itemQuantity = getValues(itemId) || initialValue
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles['operator-container']}
        onClick={handleDecreaseValue}
      >
        <span>
          <FontAwesomeIcon icon={faMinus} cursor="pointer" />
        </span>
      </button>
      <span>{itemQuantity}</span>
      <input
        id={itemId}
        type="number"
        value={itemQuantity}
        style={{ display: 'none' }}
        {...register(itemId)}
      />
      <button
        type="button"
        className={styles['operator-container']}
        onClick={handleIncreaseValue}
      >
        <span>
          <FontAwesomeIcon icon={faPlus} cursor="pointer" />
        </span>
      </button>
    </div>
  )
}
