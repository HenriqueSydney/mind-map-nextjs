'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'
import Link from 'next/link'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'

const searchFromSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFromSchema>

interface ISearchForm {
  isSameAuthorOfRepository: boolean
}

export function SearchForm({ isSameAuthorOfRepository }: ISearchForm) {
  const {
    register,
    watch,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFromSchema),
  })

  const watchedField = watch('query')

  async function filterListOfMindMap(query: string) {
    const links = document.querySelectorAll('.button-link-main')

    Array.from(links).forEach((link) => {
      const button = link.querySelector('button.main-button')
      const buttonText = (
        button as HTMLElement
      )?.textContent?.toLocaleLowerCase()

      if (query === '' || query === undefined || !query) {
        ;(link as HTMLElement).style.display = 'block'
      } else if (
        buttonText &&
        buttonText.includes(query?.toLocaleLowerCase())
      ) {
        ;(link as HTMLElement).style.display = 'block'
      } else {
        ;(link as HTMLElement).style.display = 'none'
      }
    })
  }

  useEffect(() => {
    filterListOfMindMap(watchedField)
  }, [watchedField])

  return (
    <form className={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar por um mapa mental..."
        {...register('query')}
      />

      {isSameAuthorOfRepository && (
        <Link href="/createMindMap" passHref>
          <ButtonIcon
            type="button"
            title="Mapa Mental"
            variant="SECONDARY"
            icon={<FontAwesomeIcon icon={faPlusCircle} size="1x" />}
          />
        </Link>
      )}
    </form>
  )
}
