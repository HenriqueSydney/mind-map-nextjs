import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputText } from '@/components/Form/InputText'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { Checkbox } from '@/components/Form/Checkbox'

import { UserAlreadyExistsError } from '@/app/Errors/UserAlreadyExistsError.ts'
import { UserInfo } from '../page'

import styles from './styles.module.scss'

const PASSWORD_REGEX_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/

const registerSchema = z
  .object({
    name: z
      .string({
        required_error: 'O nome é obrigatório',
      })
      .nonempty({ message: 'O nome é obrigatório' }),
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter, no mínimo, de 8 caracteres' })
      .regex(PASSWORD_REGEX_PATTERN, {
        message:
          'A senha deve ter, no mínimo, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial (ex.: .!*)',
      }),
    password_confirm: z.string(),
    accept_notification: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'A senhas devem ser iguais',
    path: ['password_confirm'], // path of error
  })
  .refine((data) => data.name.split(' ').length > 1, {
    message: 'Digite o nome completo',
    path: ['name'], // path of error
  })

type registerInputs = z.infer<typeof registerSchema>

interface IRegisterForm {
  handleTypeOfFormState: (data: UserInfo) => void
}

export function RegisterForm({ handleTypeOfFormState }: IRegisterForm) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<registerInputs>({
    resolver: zodResolver(registerSchema),
  })

  async function handleLogin(data: registerInputs) {
    try {
      const { password, email, name } = data

      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, password, email }),
      })

      if (response.status === 400) {
        throw new UserAlreadyExistsError()
      }

      if (!response.ok) {
        throw new Error()
      }

      handleTypeOfFormState({ password, email })

      reset()
    } catch (error) {
      console.error(error)
      if (error instanceof UserAlreadyExistsError) {
        toast.info('Usuário já cadastrado!')
      } else {
        toast.error('Ops! Algum erro ocorreu! Tente novamente.')
      }
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(handleLogin)}>
      <InputText
        type="text"
        label="Nome"
        placeholder="Digite seu nome completo"
        error={errors.name}
        {...register('name')}
      />

      <InputText
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        error={errors.email}
        {...register('email')}
      />

      <InputText
        type="password"
        label="Senha"
        placeholder="Digite uma Senha"
        error={errors.password}
        {...register('password')}
      />

      <InputText
        type="password"
        label="Confirmação de senha"
        placeholder="Confirme sua Senha"
        error={errors.password_confirm}
        {...register('password_confirm')}
      />

      <Checkbox
        label="Aceito receber notificações com promoções/ofertas"
        error={errors.accept_notification}
        {...register('accept_notification')}
      />

      <ButtonIcon
        title="Cadastrar"
        isSubmitting={isSubmitting}
        disabled={isSubmitting}
      />
    </form>
  )
}
