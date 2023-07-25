'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Divider } from '@/components/Divider'
import { InputText } from '@/components/Form/InputText'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { Toast } from '@/components/Toast'

import styles from './page.module.scss'

import { UserNotFoundError } from '@/app/Errors/UserNotFoundError.ts'
import { InvalidTokenError } from '@/app/Errors/InvalidTokenError'

const registerSchema = z.object({
  verificationCode: z.coerce
    .number({
      required_error: 'Código de Verificação é obrigatório',
      invalid_type_error: 'Código de verificação inválido',
    })
    .min(1000, { message: 'Código de verificação inválido' })
    .max(9999, { message: 'Código de verificação inválido' }),
})

type registerInputs = z.infer<typeof registerSchema>

interface RegisterConfirmationProps {
  params: {
    email: string
  }
}

export default function RegisterConfirmation({
  params: { email },
}: RegisterConfirmationProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<registerInputs>({
    resolver: zodResolver(registerSchema),
  })

  const router = useRouter()

  async function resendConfirmationCode() {
    try {
      const response = await fetch(`/api/users/register-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Definir o Content-Type como application/json
        },
        body: JSON.stringify({ email: decodeURIComponent(email) }),
      })

      if (!response.ok) {
        throw new Error()
      }

      if (response.status === 400) {
        throw new UserNotFoundError()
      }

      toast.success('Código reenviado! Confira seu e-mail e informe o código')
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        toast.error('Usuário não localizado!')
      } else {
        toast.error('Ops! Algum erro ocorreu! Tente novamente.')
        console.error(error)
      }
    }
  }

  async function handleRegisterConfirmation(data: registerInputs) {
    try {
      const { verificationCode } = data
      const response = await fetch('/api/users/register-confirmation', {
        method: 'PUT',
        body: JSON.stringify({
          verificationCode,
          email: decodeURIComponent(email),
        }),
      })

      if (!response.ok) {
        throw new Error()
      }

      if (response.status === 404) {
        throw new UserNotFoundError()
      }

      if (response.status === 401) {
        throw new InvalidTokenError()
      }

      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!res?.error) {
        router.push('/')
      } else {
        throw new Error()
      }

      reset()
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        toast.error('Usuário não localizado!')
      } else if (error instanceof InvalidTokenError) {
        toast.error('Código de verificação inválido.')
      } else {
        toast.error('Ops! Algum erro ocorreu! Tente novamente.')
      }
    }
  }

  return (
    <>
      <Toast />
      <main className={styles['page-container']}>
        <section className={styles['section-container']}>
          <h1>Confirme o Cadastro</h1>
          <Divider />
          <form onSubmit={handleSubmit(handleRegisterConfirmation)}>
            <p>
              Um e-mail foi encaminhado para você com o código de confirmação.
              Informe o código no campo abaixo para confirmar o cadastro
            </p>

            <InputText
              type="number"
              label="Código de confirmação"
              placeholder="Digite o código de confirmação"
              error={errors.verificationCode}
              {...register('verificationCode')}
            />

            <a href="#" onClick={resendConfirmationCode}>
              Caso não tenha recebido o email, clique aqui para reencaminhá-lo.
            </a>

            <ButtonIcon
              title="Confirmar Cadastro"
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
            />
          </form>
        </section>
      </main>
    </>
  )
}
