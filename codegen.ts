import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const config: CodegenConfig = {
  schema: process.env.CONTENTFUL_GRAPHQL_ENDPOINT,
  config: {
    headers: {
      authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
    },
  },
  ignoreNoDocuments: true,
  documents: ['./src/codegen/**/*.{gql,graphql}'],
  generates: {
    './src/codegen/graphql/type.graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        maybeValue: 'T',
      },
    },
    './src/codegen/schema/graphql.schema.json': {
      plugins: ['introspection'],
      config: {
        maybeValue: 'T',
      },
    },
    './src/codegen/graphql/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'type.graphql.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-query'],
      config: {
        maybeValue: 'T',
        exposeFetcher: true,
        exposeQueryKeys: true,
        operationResultSuffix: 'Response',
        fetcher: '@/customFetcher#customFetcher',
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
}

export default config
