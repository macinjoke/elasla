import { Reducer } from 'redux'
import { Action, SEARCH_SUCCESS } from './actions'

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

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS: {
      return { ...state, sources: action.sources }
    }
    default: {
      return state
    }
  }
}

export default reducer
