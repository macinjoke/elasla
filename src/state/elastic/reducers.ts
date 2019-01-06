import { Reducer } from 'redux'
import { Action } from './actions'

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
  text: string
  sources: Source[]
}

const initialState: State = {
  text: '',
  sources: [],
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'updateText': {
      return { ...state, text: action.text }
    }
    case 'searchSuccess': {
      return { ...state, sources: action.sources }
    }
    default: {
      return state
    }
  }
}

export default reducer
