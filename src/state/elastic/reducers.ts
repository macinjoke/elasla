import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { search } from './operations'

export interface Source {
  type: string
  user: string // user id
  text: string
  ts: string
  '@timestamp': string
  hour_of_day: number
  day_of_week: number
  user_name: string
  channel_name: string
}

export interface State {
  sources: Source[]
}

const initialState: State = {
  sources: [],
}

const reducer = reducerWithInitialState(initialState).case(
  search.async.done,
  (state, { result: response }) => ({
    ...state,
    sources: response,
  }),
  // TODO failed のとき (特にjwt のエラー) に適切な処理をする
)

export default reducer
