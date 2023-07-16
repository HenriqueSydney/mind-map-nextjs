interface IFetchAddressByCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export async function fetchAddressByCep(
  cep: string,
): Promise<IFetchAddressByCepResponse | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    console.log(data)
    if (!data) {
      return null
    }

    return data
  } catch (error) {
    console.log({ error })
  }

  return null
}
