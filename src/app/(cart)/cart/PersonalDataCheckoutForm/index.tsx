import { useState } from 'react'

import { FieldError, useFormContext } from 'react-hook-form'

import { InputText } from '@/components/Form/InputText'

import styles from './styles.module.scss'
import { InputTextWithMask } from '@/components/Form/InputTextWithMask'
import { getSession, useSession } from 'next-auth/react'

type User = {
  name: string
  email: string
  id: string
}

export function PersonalDataCheckoutForm() {
  const [user, setUser] = useState<null | User>(null)

  const { data: session, status } = useSession()

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext()

  if (status === 'authenticated') {
    if (session.user) {
      setUser(session.user)

      const userSplittedFullName = session.user.name.split(' ')

      setValue('name', userSplittedFullName[0])
      setValue('surname', userSplittedFullName.pop())
      setValue('email', session.user.email)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{ width: '50%' }}>
          <InputText
            id="name"
            label="Primeiro nome"
            placeholder="Digite o seu primeiro nome"
            readOnly={!!user}
            error={errors.name as FieldError}
            {...register('name')}
          />
        </div>
        <div style={{ width: '50%' }}>
          <InputText
            id="surname"
            label="Sobrenome"
            placeholder="Digite o seu sobrenome"
            readOnly={!!user}
            error={errors.surname as FieldError}
            {...register('surname')}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div style={{ width: '70%' }}>
          <InputText
            id="email"
            label="E-mail"
            placeholder="Digite o seu e-mail"
            readOnly={!!user}
            error={errors.email as FieldError}
            {...register('email')}
          />
        </div>
        <div style={{ width: '30%' }}>
          <InputTextWithMask
            mask="(99) 99999-9999"
            id="phoneNumber"
            label="Telefone"
            placeholder="Digite seu telefone"
            error={errors.phoneNumber as FieldError}
            {...register('phoneNumber')}
          />
        </div>
      </div>
    </div>
  )
}
