'use client'

import 'react-toastify/dist/ReactToastify.css'

import { Divider } from '@/components/Divider'
import { Toast } from '@/components/Toast'

import styles from './page.module.scss'
import { RegisterForm } from './RegisterForm'
import { useState } from 'react'
import { ConfirmationForm } from './ConfirmationForm'

export type UserInfo = {
  email: string
  password: string
}

export default function Register() {
  const [typeOfForm, setTypeOfForm] = useState('register-form')
  const [userInfo, setUserInfo] = useState({} as UserInfo)

  function handleTypeOfFormState({ email, password }: UserInfo) {
    setTypeOfForm((state) =>
      state === 'register-form' ? 'confirmation-form' : 'register-form',
    )
    setUserInfo({ email, password })
  }

  return (
    <>
      <Toast />
      <main className={styles['page-container']}>
        <section className={styles['section-container']}>
          <h1>
            {typeOfForm === 'register-form'
              ? 'Cadastre-se'
              : 'Confirme o Cadastro'}
          </h1>
          <Divider />
          {typeOfForm === 'register-form' ? (
            <RegisterForm handleTypeOfFormState={handleTypeOfFormState} />
          ) : (
            <ConfirmationForm userInfo={userInfo} />
          )}
        </section>
      </main>
    </>
  )
}
