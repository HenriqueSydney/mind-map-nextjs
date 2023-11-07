'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { Toast } from '@/components/Toast'
import { InputText } from '@/components/Form/InputText'
import { Textarea } from '@/components/Form/Textarea'

import styles from './styles.module.scss'
import { ButtonIcon } from '@/components/Buttons/ButtonIcon'
import TextBox from '@/components/Form/TextBox'
import { useEffect, useState } from 'react'
import { IMindMap } from '@/dto/mindMapDTO'
import { useRouter } from 'next/navigation'

const createMindMapSchema = z.object({
  category: z
    .string({
      required_error: 'A classificação é obrigatória',
    })
    .nonempty({ message: 'A classificação é obrigatória' }),
  name: z
    .string({
      required_error: 'Nome do mapa mental é obrigatório',
    })
    .nonempty({ message: 'Nome do mapa mental é obrigatório' }),
  context: z
    .string({
      required_error: 'Contexto para criação do mapa mental é obrigatório',
    })
    .nonempty({
      message: 'Contexto para criação do mapa mental é obrigatório',
    }),
  summary: z.string().nullable(),
  jsonStructure: z
    .string({
      required_error: 'Estrutura JSON é obrigatório',
    })
    .nonempty({ message: 'Estrutura JSON é obrigatório' }),
})

type mindMapInputs = z.infer<typeof createMindMapSchema>

interface ICreateMindMapFormProps {
  userId: string
  mindMap?: IMindMap | null
}

export function CreateMindMapForm({
  userId,
  mindMap = null,
}: ICreateMindMapFormProps) {
  const [chatGptProposition, setChatGptProposition] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<mindMapInputs>({
    resolver: zodResolver(createMindMapSchema),
    defaultValues: {
      category: mindMap ? mindMap.category : '',
      summary: mindMap ? mindMap.summary : '',
      jsonStructure: mindMap ? mindMap.jsonStructure : '',
      context: mindMap ? mindMap.context : '',
      name: mindMap ? mindMap.name : '',
    },
  })

  const [contextText, summaryText] = watch(['context', 'summary'])

  async function createMindMap(data: mindMapInputs) {
    try {
      const { category, context, name, jsonStructure, summary } = data

      if (mindMap?.id) {
        const response = await fetch('/api/mindmap', {
          method: 'PUT',
          body: JSON.stringify({
            category,
            context,
            name,
            jsonStructure,
            summary,
            mindMapId: mindMap.id,
          }),
        })

        if (!response.ok) {
          throw new Error()
        }

        toast.success(`Mapa mental atualizado com sucesso`)
      } else {
        const response = await fetch('/api/mindmap', {
          method: 'POST',
          body: JSON.stringify({
            category,
            context,
            name,
            jsonStructure,
            summary,
          }),
        })

        if (!response.ok) {
          throw new Error()
        }

        toast.success(`Mapa mental criado com sucesso`)
      }
      setTimeout(() => {
        reset()
        router.back()
      }, 2000)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data)
      } else {
        toast.error('Erro interno do sistema. Equipe de suporte foi notificada')
      }
    }
  }

  function handleGoBack() {
    router.push(`/repository/${userId}`)
  }

  function returnPrompt() {
    const model = `[
      {"id": "root", "isroot": true, "topic": "Banco de Dados Relacional"},
      {"id": "conceito_central", "parentid": "root", "topic": "Conceito Central"},
      {"id": "tabelas", "parentid": "root", "topic": "Tabelas"},
      {"id": "tabelas1", "parentid": "tabelas", "topic": "Conjunto de Dados Estruturados"},       
      {"id": "seguranca1", "parentid": "seguranca", "topic": "Autenticação e Autorização de Usuários"},
      {"id": "nosql", "parentid": "root", "topic": "Banco de Dados NoSQL"},
      {"id": "nosql_conceito_central", "parentid": "nosql", "topic": "Conceito Central"},
      {"id": "nosql_modelo_de_dados", "parentid": "nosql", "topic": "Modelo de Dados NoSQL"},     
      {"id": "nosql_vantagens2", "parentid": "nosql_vantagens", "topic": "Esquema Flexível"},
      {"id": "nosql_usos", "parentid": "nosql", "topic": "Casos de Uso de Bancos de Dados NoSQL"}, 
      {"id": "nosql_consideracoes5", "parentid": "nosql_consideracoes", "topic": "Custos e Orçamento"}
    ]`

    let context =
      'Atualize o modelo abaixo para construção de mapa mental, do modo node_array da biblioteca jsMind, de forma a representar um mapa mental'
    context +=
      ' baseado nas informações abaixo especificadas. Caso haja mais de 1 nó vinculado ao id root, inclua os nós para a direita ou para esquerda, acrescentando'
    context +=
      ' nesse nó o atributo "direction": "left" ou "direction": "right", sempre que possível colocando assuntos mais semelhantes do mesmo lado.'
    context +=
      'Acrescentar um atributo, em cada item, "resumo" contento um resumo de no máximo 300 caracteres sobre o respectivo item.'
    context += 'Retorne ao final apenas o atributo data do modelo'

    return context + '<br><br>' + model
  }

  useEffect(() => {
    const promptText = returnPrompt()
    const proposition = `${promptText}<br><br>Especificação do mapa: ${contextText}${
      summaryText && '<br><br>'
    }${summaryText}`

    setChatGptProposition(proposition)
  }, [summaryText, contextText])
  return (
    <div className={styles.container}>
      <fieldset className={styles.fieldset}>
        <h1>Cadastrar um novo Mapa Mental</h1>
        <form onSubmit={handleSubmit(createMindMap)}>
          <InputText
            label="Categoria"
            placeholder="Informe a categoria"
            error={errors.category}
            {...register('category')}
          />

          <InputText
            label="Nome"
            placeholder="Informe o nome"
            error={errors.name}
            {...register('name')}
          />

          <Textarea
            label="Contexto"
            placeholder="Informe o contexto utilizado para solicitar informações para o ChatGPT"
            error={errors.context}
            rows={5}
            {...register('context')}
          />

          <Textarea
            label="Resumo"
            placeholder="Resumo utilizado para o ChatGPT se aprofundar no mapa mental"
            error={errors.summary}
            rows={15}
            {...register('summary')}
          />

          <TextBox
            label="Proposta de Solicitação para o ChatGPT"
            htmlFormatted={true}
            text={chatGptProposition}
            height={250}
          />

          <Textarea
            label="Estrutura JSON"
            placeholder="Informe a estrutura JSON"
            error={errors.jsonStructure}
            rows={30}
            {...register('jsonStructure')}
          />

          <div className={styles.buttonContainer}>
            <ButtonIcon
              title={mindMap ? 'Atualizar' : 'Cadastrar'}
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
            />

            <ButtonIcon
              type="button"
              title="Voltar"
              variant="SECONDARY"
              onClick={() => handleGoBack()}
            />
          </div>
        </form>
      </fieldset>
      <Toast />
    </div>
  )
}
