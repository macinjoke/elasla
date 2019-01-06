import { Reducer } from 'redux'
import { Action } from './actions'

export interface User {
  username: string
  password: string
  jwt: string
}

export interface State {
  isLogin: boolean
  user: User
  loginErrorMessage: string
}

const initialState: State = {
  isLogin: false,
  user: null,
  loginErrorMessage: '',
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'loginSuccess': {
      return {
        ...state,
        isLogin: true,
        user: action.body,
        loginErrorMessage: '',
      }
    }
    case 'loginFailure': {
      return { ...state, loginErrorMessage: 'パスワードが違います' }
    }
    case 'logoutState': {
      return { ...state, isLogin: false, user: null }
    }
    default: {
      return state
    }
  }
}

export default reducer
