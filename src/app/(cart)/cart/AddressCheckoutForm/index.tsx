import { useEffect, useState } from 'react'

import { FieldError, useFormContext } from 'react-hook-form'

import { fetchAddressByCep } from '@/services/address/fetchAddressByCep'

import { InputText } from '@/components/Form/InputText'

import styles from './styles.module.scss'
import { InputTextWithMask } from '@/components/Form/InputTextWithMask'

export function AddressCheckoutForm() {
  const [isZipCodeFilled, setIsZipCodeFilled] = useState(false)

  const {
    watch,
    setValue,
    clearErrors,
    register,
    formState: { errors },
  } = useFormContext()

  const zipCode = watch('zip_code')

  async function fetchAddress(zipCode: string) {
    if (zipCode) {
      const zipCodeOnlyNumbers = zipCode.replaceAll('.', '').replace('-', '')
      if (zipCodeOnlyNumbers.length === 8) {
        const address = await fetchAddressByCep(zipCodeOnlyNumbers)

        if (!address) return null
        clearErrors()
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
          error={errors.zip_code as FieldError}
          {...register('zip_code')}
        />
      </div>
      <div className={styles.content}>
        <div style={{ width: '100%' }}>
          <InputText
            id="street"
            placeholder="Rua"
            readOnly={true}
            error={errors.street as FieldError}
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
            error={errors.number as FieldError}
            {...register('number')}
          />
        </div>
        <div style={{ width: '65%' }}>
          <InputText
            id="complement"
            placeholder="Complemento"
            readOnly={!isZipCodeFilled}
            error={errors.complement as FieldError}
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
            error={errors.neighborhood as FieldError}
            {...register('neighborhood')}
          />
        </div>
        <div style={{ width: '50%' }}>
          <InputText
            id="city"
            placeholder="Cidade"
            readOnly={true}
            error={errors.city as FieldError}
            {...register('city')}
          />
        </div>
        <div style={{ width: '15%' }}>
          <InputText
            id="state"
            placeholder="UF"
            readOnly={true}
            error={errors.state as FieldError}
            {...register('state')}
          />
        </div>
      </div>
    </div>
  )
}
