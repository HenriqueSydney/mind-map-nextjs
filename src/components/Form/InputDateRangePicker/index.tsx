'use client'
import React, { SyntheticEvent, useState } from 'react'

import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'

import { FieldError, Merge } from 'react-hook-form'

import ptBR from 'date-fns/locale/pt-BR'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import { InputDatePickerContainer } from './CalendarContainer'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './styles.module.scss'
import { ErrorMessage } from '../ErrorMessage'

registerLocale('pt-BR', ptBR)

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  label?: string
  inputError?: Merge<FieldError, (FieldError | undefined | null)[]>
  onChange: (
    date: [Date | null, Date | null],
    event: SyntheticEvent<any, Event> | undefined,
  ) => void
}

export function InputDateRangePicker({
  onChange,
  label = '',
  inputError = undefined,
  ...rest
}: DatePickerProps) {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)

  function handleToggleCalendarVisibility() {
    setDatePickerOpen((state) => !state)
  }

  return (
    <>
      <div>
        <div
          className={`${styles.container} ${
            inputError && styles['input-error']
          }`}
          onClick={handleToggleCalendarVisibility}
        >
          {label && (
            <div className={styles['label-container']}>
              <FontAwesomeIcon icon={faCalendar} />
              <label>{label}</label>
            </div>
          )}
          <ReactDatePicker
            selectsRange
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            customInput={<InputDatePickerContainer />}
            showDisabledMonthNavigation
            monthsShown={2}
            open={isDatePickerOpen}
            shouldCloseOnSelect={false}
            {...rest}
          />
        </div>
        {inputError !== undefined &&
          Array.isArray(inputError) &&
          inputError.map((error) => {
            if (!error) return false
            return (
              <ErrorMessage key={error.message} errorMessage={error.message} />
            )
          })}

        {inputError !== undefined && !Array.isArray(inputError) && (
          <ErrorMessage errorMessage={inputError.message} />
        )}
      </div>
    </>
  )
}
