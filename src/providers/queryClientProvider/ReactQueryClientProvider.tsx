'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

interface ReactQueryClientProviderProps {
  children: ReactNode
}

export default function ReactQueryClientProvider({
  children,
}: ReactQueryClientProviderProps) {
  const queryClientFactory = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })

  const [queryClient] = useState(queryClientFactory)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
