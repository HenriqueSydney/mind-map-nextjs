'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import * as RadioGroup from '@radix-ui/react-radio-group'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { faClockFour, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CartContext } from '@/context/CartContext'

import { RadioButton } from '@/components/Form/RadioButton'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { InputDatePicker } from '@/components/Form/InputDatePicker'
import { SelectWithCounter } from '@/components/Form/SelectWithCounter'
import { Divider } from '@/components/Divider'

import { ProductData } from '@/dtos/activities'

import styles from './styles.module.scss'
import { priceFormatter } from '@/utils/formatter'

interface ActivityFormCheckoutProps {
  activity: ProductData
}

const activityFormCheckoutValidationSchema = zod
  .object({
    reservationDate: zod
      .date({
        required_error: 'A data pretendida de reserva é obrigatória',
        invalid_type_error: 'Data inválida',
      })
      .min(new Date(), { message: 'A data mínima é hoje' }),
    quantityOfAdult: zod.number(),
    quantityOfChild: zod.number(),
    quantityOfSenior: zod.number(),
    hour: zod.string(),
  })
  .refine(
    (data) =>
      data.quantityOfAdult + data.quantityOfChild + data.quantityOfSenior > 0,
    {
      message: 'Selecione ao menos 1 ingresso',
      path: ['quantityOfAdult'],
    },
  )

type ActivityFormCheckoutData = zod.infer<
  typeof activityFormCheckoutValidationSchema
>

export function ActivityFormCheckout({ activity }: ActivityFormCheckoutProps) {
  const [summary, setSummary] = useState(0)
  const [inputSelectionValue, setInputSelectionValue] = useState('')
  const activityFormCheckout = useForm<ActivityFormCheckoutData>({
    resolver: zodResolver(activityFormCheckoutValidationSchema),
    defaultValues: {
      quantityOfAdult: 0,
      quantityOfChild: 0,
      quantityOfSenior: 0,
      hour: activity.availableHourRanges![0].hourRange,
    },
  })

  const { addNewItemToCart } = useContext(CartContext)

  const navigation = useRouter()

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = activityFormCheckout

  function onDatePickerChange(date: Date | null) {
    if (!date) return
    activityFormCheckout.setValue('reservationDate', date)
  }

  const watchedFields = watch()

  function handleAddItensToCart(data: ActivityFormCheckoutData) {
    if (!activity) {
      return false
    }

    addNewItemToCart({
      id: activity.id,
      isIncludedInCart: true,
      subtotal: summary,
      type: 'activity',
      activity: {
        activityId: activity.id,
        title: activity.name,
        date: data.reservationDate,
        hourInterval: data.hour,
        quantityOfAdults: data.quantityOfAdult,
        quantityOfChildren: data.quantityOfChild,
        quantityOfSeniors: data.quantityOfSenior,
      },
    })

    reset()

    navigation.push('/cart')
  }

  useEffect(() => {
    const summaries = {
      quantityOfAdult: {
        label: 'adulto(s)',
        value: watchedFields.quantityOfAdult,
        price: activity.adultPrice,
      },
      quantityOfChild: {
        label: 'criança(s)',
        value: watchedFields.quantityOfChild,
        price: activity.childPrice,
      },
      quantityOfSenior: {
        label: 'idoso(s)',
        value: watchedFields.quantityOfSenior,
        price: activity.seniorPrice,
      },
    }

    let subtotal = 0
    const summaryOfSelectionArray = Object.entries(summaries)
      .filter(([_, { value }]) => value > 0)
      .map(([_, { label, value, price }]) => {
        subtotal += price ? price * value : 0
        return `${value} ${label}`
      })

    const inputValueToShowSummaryOfSelection =
      summaryOfSelectionArray.join(', ')
    setInputSelectionValue(inputValueToShowSummaryOfSelection)

    setSummary(subtotal)
  }, [
    activity.adultPrice,
    activity.childPrice,
    activity.seniorPrice,
    watchedFields.quantityOfAdult,
    watchedFields.quantityOfChild,
    watchedFields.quantityOfSenior,
  ])

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(handleAddItensToCart)}
    >
      <div className={styles['form-content']}>
        <Controller
          control={control}
          name="reservationDate"
          render={({ field }) => (
            <InputDatePicker
              label="Selecione o dia desejado"
              onChange={(date) => onDatePickerChange(date)}
              selected={field.value}
              minDate={new Date()}
              inputError={errors.reservationDate}
            />
          )}
        />
        <FormProvider {...activityFormCheckout}>
          <SelectWithCounter.Root
            label="Quantidade de Pessoas"
            icon={faUserAlt}
            inputValueToShowSummaryOfSelection={inputSelectionValue}
            inputError={errors.quantityOfAdult}
          >
            <SelectWithCounter.Option
              itemId="quantityOfAdult"
              title="Adulto"
              subtitle="(Acima de 12 anos)"
              amount={activity.adultPrice!}
            />

            <SelectWithCounter.Option
              itemId="quantityOfChild"
              title="Criança"
              subtitle="(Até 12 anos)"
              amount={activity.childPrice!}
            />

            <SelectWithCounter.Option
              itemId="quantityOfSenior"
              title="Idoso"
              subtitle="(Acima de 60 anos)"
              amount={activity.seniorPrice!}
            />

            {!inputSelectionValue && (
              <small>É necessário adicionar ao menos 1 não dependente</small>
            )}
          </SelectWithCounter.Root>
        </FormProvider>

        <label className={styles['radiogroup-label']}>
          <FontAwesomeIcon icon={faClockFour} />
          Selecione o horário
        </label>

        <Controller
          control={control}
          name="hour"
          render={({ field }) => {
            return (
              <RadioGroup.Root
                onValueChange={field.onChange}
                value={field.value}
              >
                {activity.availableHourRanges?.map((range) => (
                  <div
                    key={range.hourRange}
                    className={styles['selection-radio-container']}
                  >
                    <RadioButton
                      title={range.hourRange}
                      value={range.hourRange}
                    />
                    <span>Restam {range.quantity} vagas</span>
                  </div>
                ))}
              </RadioGroup.Root>
            )
          }}
        />
      </div>

      {summary > 0 && (
        <div className={styles.summary}>
          <Divider title="Resumo" />
          <strong>{priceFormatter.format(summary)}</strong>
        </div>
      )}

      <div className={styles.button}>
        <ButtonIcon type="submit" title="Reservar" />
      </div>
    </form>
  )
}
