'use client'

import { useContext, useEffect, useState } from 'react'

import { Step, Stepper } from 'react-form-stepper'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { CartContext } from '@/context/CartContext'

import { SectionContainer } from '@/components/SectionContainer'
import { Divider } from '@/components/Divider'
import { CheckoutForm } from './CheckoutForm'
import { EmptyCart } from './EmptyCart'
import { FilledCart } from './FilledCart'

import styles from './page.module.scss'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'

const checkoutFormValidationSchema = zod.object({
  zip_code: zod
    .string()
    .min(8, 'O CEP deve ter no mínimo 8 dígitos')
    .max(10, 'O CEP deve ter no máximo 10 dígitos')
    .nonempty('Informe seu CEP'),
  street: zod.string().nonempty('Informe sua rua'),
  number: zod.string().nonempty('Informe o número de seu endereço'),
  complement: zod.string().default(''),
  neighborhood: zod.string().nonempty('Informe o seu bairro'),
  city: zod.string().nonempty('Informe a sua cidade'),
  state: zod
    .string()
    .min(2, 'Informe o seu Estado')
    .max(2, 'O Estado pode ter no máximo 2 caracteres')
    .nonempty('Informe a seu Estado'),
})

export type CheckoutFormData = zod.infer<typeof checkoutFormValidationSchema>

export default function Cart() {
  const [totalCart, setTotalCart] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const { cart, cleanCart } = useContext(CartContext)

  const checkoutForm = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormValidationSchema),
    defaultValues: {
      zip_code: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const { handleSubmit, reset } = checkoutForm

  // const { errors } = formState

  function handleCheckout(data: CheckoutFormData) {
    if (cart.length === 0) {
      return
    }

    cleanCart()
    reset()
  }

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.subtotal, 0)
    setTotalCart(total)
  }, [cart])

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <SectionContainer>
          <Divider title="Seu carrinho" titleType="header" />
          <EmptyCart />
        </SectionContainer>
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <SectionContainer>
        <Stepper activeStep={activeStep} className={styles.stepper}>
          <Step label="Seus Dados" />
          <Step label="Pagamento" />
          <Step label="Confirmação" />
        </Stepper>
        <form onSubmit={handleSubmit(handleCheckout)} action="/success-order">
          <h1>Complete seu dados para continuar</h1>

          <FormProvider {...checkoutForm}>
            <CheckoutForm />
          </FormProvider>

          <div className={styles.buttons}>
            {activeStep > 0 && (
              <ButtonIcon
                title="Voltar"
                onClick={() => setActiveStep((state) => state - 1)}
              />
            )}
            {activeStep < 2 && (
              <ButtonIcon
                title="Avançar"
                onClick={() => setActiveStep((state) => state + 1)}
              />
            )}
            {activeStep === 2 && (
              <ButtonIcon
                title="Confirmar e realizar pagamento"
                onClick={() => setActiveStep(0)}
              />
            )}
          </div>
        </form>
      </SectionContainer>
      <SectionContainer>
        <Divider title="Seu carrinho" titleType="header" />

        <FilledCart cart={cart} totalCart={totalCart} />
      </SectionContainer>
    </main>
  )
}
