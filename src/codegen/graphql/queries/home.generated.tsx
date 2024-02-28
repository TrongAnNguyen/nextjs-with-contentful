import * as Types from '../type.graphql'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { customFetcher } from '@/customFetcher'
export type GetHomesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetHomesQueryResponse = {
  __typename?: 'Query'
  homeCollection?: {
    __typename?: 'HomeCollection'
    items: Array<{
      __typename?: 'Home'
      name?: string
      city?: string
      state?: string
      sys: { __typename?: 'Sys'; id: string }
      photo?: { __typename?: 'Asset'; url?: string }
    }>
  }
}

export type GetHomeDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
}>

export type GetHomeDetailQueryResponse = {
  __typename?: 'Query'
  home?: {
    __typename?: 'Home'
    name?: string
    city?: string
    state?: string
    laundry?: boolean
    availableUnits?: number
    wifi?: boolean
    photo?: { __typename?: 'Asset'; url?: string }
  }
}

export const GetHomesDocument = `
    query GetHomes {
  homeCollection {
    items {
      sys {
        id
      }
      name
      city
      state
      photo {
        url
      }
    }
  }
}
    `
export const useGetHomesQuery = <TData = GetHomesQueryResponse, TError = unknown>(
  variables?: GetHomesQueryVariables,
  options?: UseQueryOptions<GetHomesQueryResponse, TError, TData>,
) =>
  useQuery<GetHomesQueryResponse, TError, TData>(
    variables === undefined ? ['GetHomes'] : ['GetHomes', variables],
    customFetcher<GetHomesQueryResponse, GetHomesQueryVariables>(GetHomesDocument, variables),
    options,
  )

useGetHomesQuery.getKey = (variables?: GetHomesQueryVariables) =>
  variables === undefined ? ['GetHomes'] : ['GetHomes', variables]
useGetHomesQuery.fetcher = (variables?: GetHomesQueryVariables, options?: RequestInit['headers']) =>
  customFetcher<GetHomesQueryResponse, GetHomesQueryVariables>(GetHomesDocument, variables, options)
export const GetHomeDetailDocument = `
    query GetHomeDetail($id: String!) {
  home(id: $id) {
    name
    city
    state
    laundry
    availableUnits
    wifi
    photo {
      url
    }
  }
}
    `
export const useGetHomeDetailQuery = <TData = GetHomeDetailQueryResponse, TError = unknown>(
  variables: GetHomeDetailQueryVariables,
  options?: UseQueryOptions<GetHomeDetailQueryResponse, TError, TData>,
) =>
  useQuery<GetHomeDetailQueryResponse, TError, TData>(
    ['GetHomeDetail', variables],
    customFetcher<GetHomeDetailQueryResponse, GetHomeDetailQueryVariables>(
      GetHomeDetailDocument,
      variables,
    ),
    options,
  )

useGetHomeDetailQuery.getKey = (variables: GetHomeDetailQueryVariables) => [
  'GetHomeDetail',
  variables,
]
useGetHomeDetailQuery.fetcher = (
  variables: GetHomeDetailQueryVariables,
  options?: RequestInit['headers'],
) =>
  customFetcher<GetHomeDetailQueryResponse, GetHomeDetailQueryVariables>(
    GetHomeDetailDocument,
    variables,
    options,
  )
