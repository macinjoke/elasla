import { Source } from './reducers'

export const SEARCH_SUCCESS = 'elastic/SEARCH_SUCCESS'
export interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS
  sources: Source[]
}
export const searchSuccess = (sources: Source[]): SearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  sources,
})

export type Action = SearchSuccessAction
