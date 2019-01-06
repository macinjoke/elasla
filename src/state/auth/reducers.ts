import { Reducer } from 'redux'
import { Action, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_STATE } from './actions'

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
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        user: action.body,
        loginErrorMessage: '',
      }
    }
    case LOGIN_FAILURE: {
      return { ...state, loginErrorMessage: 'パスワードが違います' }
    }
    case LOGOUT_STATE: {
      return { ...state, isLogin: false, user: null }
    }
    default: {
      return state
    }
  }
}

export default reducer
