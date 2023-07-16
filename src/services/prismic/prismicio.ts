import { env } from '@/env'
import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = env.PRISMIC_ENDPOINT

/**
 * A list of Route Resolver objects that define how a document's `url` field
 * is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const thirtyMinutes = 60 * 30

  const client = prismic.createClient(repositoryName, {
    // routes,
    accessToken: env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: thirtyMinutes } },
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
  })

  return client
}
