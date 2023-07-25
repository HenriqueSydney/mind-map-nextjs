import { useState } from 'react'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { PropagateLoader } from 'react-spinners'

import styles from './styles.module.scss'
import { Divider } from '@/components/Divider'
import { useFormContext } from 'react-hook-form'
import { TextWithLabel } from '@/components/TextWithLabel'

initMercadoPago('TEST-b0646181-1d24-4f30-a2cd-c992c0571d51')

interface ICheckoutWallet {
  preferenceId: string
  isLoading: boolean
}

export default function CheckoutWallet({
  preferenceId,
  isLoading,
}: ICheckoutWallet) {
  const [isReady, setIsReady] = useState(false)

  const { watch } = useFormContext()

  const {
    name,
    surname,
    email,
    phoneNumber,
    zip_code,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
  } = watch()

  function handleOnReady() {
    setIsReady(true)
  }

  if (isLoading && !isReady) {
    return (
      <div className={styles.loader}>
        <PropagateLoader color="#00875F" />
      </div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <Divider title="Dados Pessoais" />
        <br />
        <div>
          <div className={styles.content}>
            <div style={{ width: '70%' }}>
              <TextWithLabel title="Nome" text={name} />
            </div>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="Sobrenome" text={surname} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <div style={{ width: '70%' }}>
              <TextWithLabel title="E-mail" text={email} />
            </div>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="Telefone" text={phoneNumber} />
            </div>
          </div>
        </div>
        <br />
        <Divider title="Endereço" />
        <br />
        <div>
          <div className={styles.content}>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="CEP" text={zip_code} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <div style={{ width: '40%' }}>
              <TextWithLabel title="Rua" text={street} />
            </div>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="Complemento" text={complement} />
            </div>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="Número" text={number} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <div style={{ width: '40%' }}>
              <TextWithLabel title="Bairro" text={neighborhood} />
            </div>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="Cidade" text={city} />
            </div>
            <div style={{ width: '30%' }}>
              <TextWithLabel title="UF" text={state} />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div id="wallet_container"></div>
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId, redirectMode: 'modal' }}
          customization={{
            visual: {
              borderRadius: '8px',
            },
          }}
          onReady={handleOnReady}
        />
      )}
    </>
  )
}
