import { Action, Reducer } from 'redux'

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
  isLogin: boolean
  user: {
    username: string
    password: string
    jwt: string
  }
  text: string
  sources: Source[]
}

const initialState: State = {
  isLogin: false,
  user: null,
  text: '',
  sources: [],
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case 'loginSuccess': {
      return { ...state, isLogin: true, user: action.body }
    }
    case 'logoutState': {
      return { ...state, isLogin: false, user: null }
    }
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
