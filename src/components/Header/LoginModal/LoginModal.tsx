import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { ButtonIcon } from '../../Buttons/ButtonIcon'
import { Divider } from '../../Divider'
import { InputText } from '../../Form/InputText'

import styles from './styles.module.scss'

const loginModalSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z.string({
    required_error: 'O nome é obrigatório',
  }),
})

type loginModalFormInputs = z.infer<typeof loginModalSchema>

export function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<loginModalFormInputs>({
    resolver: zodResolver(loginModalSchema),
  })

  async function handleLogin(data: loginModalFormInputs) {
    const { password, email } = data
    console.log({ password, email })
    reset()
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(handleLogin)}>
      <InputText
        type="email"
        placeholder="Digite seu email"
        required
        error={errors.email}
        {...register('email')}
      />
      <InputText
        type="password"
        placeholder="Senha"
        required
        error={errors.password}
        {...register('password')}
      />
      <ButtonIcon type="submit" disabled={!!isSubmitting} title="Entrar" />
      <div className={styles.registerContainer}>
        <strong>Ainda não possui uma conta?</strong>
        <Link href="/register">Cadastre-se</Link>
      </div>
      <div className={styles.registerContainer}>
        <Divider title="OU" />
      </div>
      <ButtonIcon
        type="button"
        icon={<FontAwesomeIcon icon={faGoogle} />}
        title="Acessar com conta Google"
        variant="SECONDARY"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      />
      <ButtonIcon
        type="button"
        icon={<FontAwesomeIcon icon={faFacebook} />}
        title="Acessar com Facebook"
        variant="SECONDARY"
      />
    </form>
  )
}
