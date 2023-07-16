'use client'

import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import { InputText } from '@/components/Form/InputText'
import { Textarea } from '@/components/Form/Textarea'

import { ProductData } from '@/dtos/activities'

import styles from './styles.module.scss'

interface ActivityContactProps {
  activity: ProductData
}

const ActivityContactValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  phoneNumber: zod.string(),
  message: zod.string(),
})

type ActivityContactData = zod.infer<typeof ActivityContactValidationSchema>

export function ActivityContact({ activity }: ActivityContactProps) {
  const ActivityContact = useForm<ActivityContactData>({
    resolver: zodResolver(ActivityContactValidationSchema),
  })

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const { handleSubmit, reset } = ActivityContact

  function handleSendMail(data: ActivityContactData) {
    reset()
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit(handleSendMail)}>
      <div className={styles['form-content']}>
        <p>
          Queremos te atender da melhor maneira, por isso esse passeio não é
          vendido online. Entre em contato conosco para mais informações.
        </p>
        <InputText label="Nome Completo" placeholder="Digite o nome completo" />
        <InputText label="Email" placeholder="Digite o seu email" />
        <InputText label="Telefone" placeholder="Digite o seu telefone" />
        <Textarea
          label="Mensagem"
          placeholder="Digite sua mensagem"
          style={{ height: '200px' }}
          value="Olá, tenho interesse neste passeio. Gostaria de mais informações sobre o mesmo. Aguardo o contato, Obrigado!"
        />
        <div className={styles.recaptcha}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lf83BwnAAAAAFePxj40gM7w0kZ4_yjS5jqr_0mA"
          />
        </div>
      </div>

      <div className={styles.button}>
        <ButtonIcon type="submit" title="Enviar Mensagem" />
      </div>
    </form>
  )
}
