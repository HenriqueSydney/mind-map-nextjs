'use client'

import { useContext, useEffect, useState } from 'react'

import { Step, Stepper } from 'react-form-stepper'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { CartContext } from '@/context/CartContext'

import { SectionContainer } from '@/components/SectionContainer'
import { Divider } from '@/components/Divider'
import { EmptyCart } from './EmptyCart'
import { FilledCart } from './FilledCart'
import { AddressCheckoutForm } from './AddressCheckoutForm'
import { PersonalDataCheckoutForm } from './PersonalDataCheckoutForm'
import NavigationButtons from './NavigationButtons'
import CheckoutWallet from './CheckoutWallet'

import styles from './page.module.scss'

enum Actions {
  FORWARD,
  BACKWARD,
  BEGIN,
}

const checkoutFormValidationSchema = zod.object({
  name: zod.string().min(3, 'O primeiro nome deve ter no mínimo 3 caracteres'),
  surname: zod.string().min(3, 'O sobrenome deve ter no mínimo 3 caracteres'),
  email: zod.string().email({ message: 'E-mail inválido' }),
  phoneNumber: zod
    .string()
    .min(15, 'O telefone deve ter no mínimo 11 dígitos')
    .max(15, 'O telefone deve ter no máximo 11 dígitos'),
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
  const [isLoading, setIsLoading] = useState(false)

  const [preferenceId, setPreferenceId] = useState('')

  const { cart, cleanCart } = useContext(CartContext)

  const checkoutForm = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormValidationSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      zip_code: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const { handleSubmit, reset, getValues } = checkoutForm

  function handleCreatePreference() {
    handleChangeStep(Actions.FORWARD)

    setIsLoading(true)

    const checkOutFormData = getValues()

    fetch('/api/mercado-pago', {
      method: 'POST',
      body: JSON.stringify({ cartData: cart, checkOutFormData }),
    })
      .then((response) => {
        return response.json()
      })
      .then((preference) => {
        setPreferenceId(preference.id)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  async function handleChangeStep(action: Actions) {
    if (action === Actions.BACKWARD) {
      setActiveStep((state) => state - 1)
    } else if (action === Actions.FORWARD) {
      setActiveStep((state) => state + 1)
    } else {
      setActiveStep(0)
    }
  }

  function handleCheckout(data: CheckoutFormData) {
    if (cart.length === 0) {
      return data
    }

    // cleanCart()
    // reset()
  }

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.subtotal, 0)
    setTotalCart(total)
  }, [cart])

  if (cart.length === 0) {
    return (
      <SectionContainer>
        <Divider title="Seu carrinho" titleType="header" />
        <EmptyCart />
      </SectionContainer>
    )
  }

  return (
    <main className={`${styles.container}`}>
      <SectionContainer>
        <Stepper activeStep={activeStep} className={styles.stepper}>
          <Step label="Seus Dados" />
          <Step label="Endereço" />
          <Step label="Pagamento" />
          <Step label="Confirmação" />
        </Stepper>
        <form onSubmit={handleSubmit(handleCheckout)} action="/success-order">
          <FormProvider {...checkoutForm}>
            {activeStep === 0 && <PersonalDataCheckoutForm />}
            {activeStep === 1 && <AddressCheckoutForm />}

            {activeStep === 2 && (
              <CheckoutWallet
                preferenceId={preferenceId}
                isLoading={isLoading}
              />
            )}

            <NavigationButtons
              handleChangeStep={handleChangeStep}
              handleCreatePreference={handleCreatePreference}
              activeStep={activeStep}
            />
          </FormProvider>
        </form>
      </SectionContainer>
      <SectionContainer>
        <Divider title="Seu carrinho" titleType="header" />

        <FilledCart cart={cart} totalCart={totalCart} />
      </SectionContainer>
    </main>
  )
}
