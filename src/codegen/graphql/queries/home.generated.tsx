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
      id: number
      name?: string
      city: string
      state: string
      photo: string | undefined
      availableUnits: number
      wifi: boolean
      laundry: boolean
    }>
  }
}

export const GetHomesDocument = `
    query GetHomes {
  homeCollection {
    items {
      id
      name
      city
      state
      photo
      availableUnits
      wifi
      laundry
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
