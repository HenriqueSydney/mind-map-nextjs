import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputText } from '../../Form/InputText'
import { ButtonIcon } from '../../Buttons/ButtonIcon'

import styles from './styles.module.scss'

const getReservationInfoModalSchema = z.object({
  reservationCode: z.string(),
  email: z.string().email('Digite um e-mail válido'),
})

type getReservationInfoModalFormInputs = z.infer<
  typeof getReservationInfoModalSchema
>

export function GetReservationInfoModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<getReservationInfoModalFormInputs>({
    resolver: zodResolver(getReservationInfoModalSchema),
  })

  async function handleCreateNewTransaction(
    data: getReservationInfoModalFormInputs,
  ) {
    const { reservationCode, email } = data
    console.log({ reservationCode, email })
    reset()
  }

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(handleCreateNewTransaction)}
    >
      <InputText
        type="text"
        placeholder="Código da Reserva"
        required
        error={errors.reservationCode}
        {...register('reservationCode')}
      />
      <InputText
        type="email"
        placeholder="E-mail"
        required
        error={errors.email}
        {...register('email')}
      />

      {<ButtonIcon type="submit" disabled={isSubmitting} title="Pesquisar" />}
    </form>
  )
}
