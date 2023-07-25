'use client'

import { useContext, useEffect, useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { faHotel } from '@fortawesome/free-solid-svg-icons'

import { InputDateRangePicker } from '@/components/Form/InputDateRangePicker'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { Select } from '@/components/Form/Select'
import { FormSummary } from '@/components/FormSummary'

import { AccommodationData } from '@/dtos/accommodations'
import { priceFormatter } from '@/utils/formatter'

import styles from './styles.module.scss'
import { dateDifferenceInDays } from '@/utils/date'
import { CartContext } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { cartService } from '@/services/cart/cart'

interface IAccommodationFormCheckout {
  accommodation: AccommodationData | null
}

const accommodationFormCheckoutValidationSchema = zod.object({
  checkInAndCheckOutDate: zod
    .array(zod.date().nullable(), zod.date().nullable())
    .nonempty({ message: 'O período é obrigatório' })
    .superRefine((val, ctx) => {
      if (val[0] === null || val[1] === null) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: 'Período selecionado inválido',
        })
      }

      if (val[0] && val[1] && val[0] > val[1]) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: `A data do CheckIn deve ser menor que a data do CheckOut`,
        })
      }
    }),
  quantityOfAccommodations: zod.coerce.number(),
})

type AccommodationFormCheckoutData = zod.infer<
  typeof accommodationFormCheckoutValidationSchema
>

export function AccommodationFormCheckout({
  accommodation,
}: IAccommodationFormCheckout) {
  const [summary, setSummary] = useState({
    subtotal: 0,
    quantityOfDays: 0,
    quantityOfAccommodations: 0,
    dailyRate: accommodation ? accommodation.price : 0,
  })

  const navigation = useRouter()

  const accommodationFormCheckout = useForm<AccommodationFormCheckoutData>({
    resolver: zodResolver(accommodationFormCheckoutValidationSchema),
    defaultValues: {
      checkInAndCheckOutDate: [null, null],
      quantityOfAccommodations: 1,
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    reset,
    register,
    formState: { isSubmitting, errors },
  } = accommodationFormCheckout

  function onDatePickerChange(dates: [Date | null, Date | null]) {
    accommodationFormCheckout.setValue('checkInAndCheckOutDate', dates)
  }

  const { addNewItemToCart } = useContext(CartContext)

  const { addNewItemToCart: AddCartCookie, getCartData } = cartService()

  function handleAddItensToCart(data: AccommodationFormCheckoutData) {
    if (!accommodation) {
      return false
    }

    const [checkIn, checkOut] = data.checkInAndCheckOutDate

    if (checkIn === null || checkOut === null) {
      return false
    }

    addNewItemToCart({
      id: accommodation.id,
      isIncludedInCart: true,
      subtotal: summary.subtotal,
      type: 'accommodation',
      accommodation: {
        accommodationId: accommodation.id,
        title: accommodation.name,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        quantityOfAccommodations: summary.quantityOfAccommodations,
        quantityOfDays: summary.quantityOfDays,
      },
    })

    AddCartCookie({
      id: accommodation.id,
      isIncludedInCart: true,
      subtotal: summary.subtotal,
      type: 'accommodation',
      accommodation: {
        accommodationId: accommodation.id,
        title: accommodation.name,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        quantityOfAccommodations: summary.quantityOfAccommodations,
        quantityOfDays: summary.quantityOfDays,
      },
    })

    getCartData()

    reset()

    setSummary({
      subtotal: 0,
      quantityOfDays: 0,
      quantityOfAccommodations: 0,
      dailyRate: accommodation ? accommodation.price : 0,
    })

    navigation.push('/cart')
  }

  const watchedValues = watch()
  const [quantityOfAvailableRoomsOptions, setQuantityOfAvailableRoomsOptions] =
    useState([{ value: '0', label: '0' }])

  useEffect(() => {
    const quantityAvailable = []

    for (let i = 1; i <= 12; i++) {
      const accommodationPricePerDay = accommodation ? accommodation.price : 0
      const priceByQuantityOfDaysInSelection = i * accommodationPricePerDay
      const plural = i > 1 ? 's' : ''
      quantityAvailable.push({
        value: String(i),
        label: `${String(
          i,
        )} quarto${plural} (Valor por dia: ${priceFormatter.format(
          priceByQuantityOfDaysInSelection,
        )})`,
      })
    }

    setQuantityOfAvailableRoomsOptions(quantityAvailable)
  }, [accommodation])

  useEffect(() => {
    const [checkIn, checkOut] = watchedValues.checkInAndCheckOutDate
    if (accommodation && checkIn && checkOut) {
      const quantityOfDays = dateDifferenceInDays(checkIn, checkOut) + 1

      const quantityOfAccommodations = watchedValues.quantityOfAccommodations

      const subtotal =
        accommodation.price * quantityOfDays * quantityOfAccommodations

      setSummary((state) => {
        return {
          ...state,
          subtotal,
          quantityOfDays,
          quantityOfAccommodations,
        }
      })
    }
  }, [
    accommodation,
    watchedValues.quantityOfAccommodations,
    watchedValues.checkInAndCheckOutDate,
  ])

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(handleAddItensToCart)}
      action="/cart"
    >
      <div className={styles['form-content']}>
        <Controller
          control={control}
          name="checkInAndCheckOutDate"
          render={({ field }) => (
            <InputDateRangePicker
              label="Selecione o período desejado"
              placeholderText="Selecione o período desejado"
              onChange={(dates) => onDatePickerChange(dates)}
              startDate={field.value[0]}
              endDate={field.value[1]}
              minDate={new Date()}
              inputError={errors.checkInAndCheckOutDate}
            />
          )}
        />

        <Select
          label="Selecione a quantidade de quartos"
          icon={faHotel}
          options={quantityOfAvailableRoomsOptions}
          error={errors.quantityOfAccommodations}
          {...register('quantityOfAccommodations')}
        />

        {summary.subtotal > 0 && <FormSummary summary={summary} />}
      </div>
      <div className={styles.button}>
        <ButtonIcon
          type="submit"
          title="Adicionar ao carrinho"
          disabled={isSubmitting}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}
