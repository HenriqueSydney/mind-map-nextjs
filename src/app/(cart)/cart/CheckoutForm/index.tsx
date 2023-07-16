import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { fetchAddressByCep } from '@/services/address/fetchAddressByCep'

import { InputText } from '@/components/Form/InputText'

import styles from './styles.module.scss'
import { InputTextWithMask } from '@/components/Form/InputTextWithMask'

const checkoutFormValidationSchema = zod.object({
  zip_code: zod.string().nonempty('Informe seu CEP'),
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

type CheckoutFormData = zod.infer<typeof checkoutFormValidationSchema>

export function CheckoutForm() {
  const [isZipCodeFilled, setIsZipCodeFilled] = useState(false)
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>()

  // const { errors } = formState
  const zipCode = watch('zip_code')

  async function fetchAddress(zipCode: string) {
    if (zipCode) {
      const zipCodeOnlyNumbers = zipCode.replaceAll('.', '').replace('-', '')
      if (zipCodeOnlyNumbers.length === 8) {
        const address = await fetchAddressByCep(zipCodeOnlyNumbers)

        if (!address) return null
        console.log(address)
        setIsZipCodeFilled(true)
        setValue('city', address.localidade)
        setValue('complement', address.complemento)
        setValue('neighborhood', address.bairro)
        setValue('state', address.uf)
        setValue('street', address.logradouro)
      }
    }
  }

  useEffect(() => {
    fetchAddress(zipCode)
  }, [zipCode])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <InputTextWithMask
          mask="99.999-999"
          id="zip_code"
          placeholder="CEP"
          style={{ width: '35%' }}
          error={errors.zip_code}
          {...register('zip_code')}
        />
      </div>
      <div className={styles.content}>
        <div style={{ width: '100%' }}>
          <InputText
            id="street"
            placeholder="Rua"
            readOnly={true}
            error={errors.street}
            {...register('street')}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ width: '35%' }}>
          <InputText
            id="number"
            placeholder="Número"
            readOnly={!isZipCodeFilled}
            error={errors.number}
            {...register('number')}
          />
        </div>
        <div style={{ width: '65%' }}>
          <InputText
            id="complement"
            placeholder="Complemento"
            readOnly={!isZipCodeFilled}
            error={errors.complement}
            {...register('complement')}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ width: '35%' }}>
          <InputText
            id="neighborhood"
            placeholder="Bairro"
            readOnly={true}
            error={errors.neighborhood}
            {...register('neighborhood')}
          />
        </div>
        <div style={{ width: '50%' }}>
          <InputText
            id="city"
            placeholder="Cidade"
            readOnly={true}
            error={errors.city}
            {...register('city')}
          />
        </div>
        <div style={{ width: '15%' }}>
          <InputText
            id="state"
            placeholder="UF"
            readOnly={true}
            error={errors.state}
            {...register('state')}
          />
        </div>
      </div>
    </div>
  )
}
