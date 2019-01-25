import { Reducer } from 'redux'
import {
  Action,
  FETCH_LOGIN_STATE_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_STATE,
} from './actions'

export interface User {
  username: string
}

export interface State {
  isLogin: boolean
  user: User
  isLoginError: boolean
  isFetchLoginStateError: boolean
}

const initialState: State = {
  isLogin: false,
  user: null,
  isLoginError: false,
  isFetchLoginStateError: false,
}

const refreshError = (state: State): State => {
  return { ...state, isLoginError: false, isFetchLoginStateError: false }
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...refreshError(state),
        isLogin: true,
        user: action.body,
      }
    }
    case LOGIN_FAILURE: {
      return { ...refreshError(state), isLoginError: true }
    }
    case FETCH_LOGIN_STATE_FAILURE: {
      return { ...refreshError(state), isFetchLoginStateError: true }
    }
    case LOGOUT_STATE: {
      return { ...refreshError(state), isLogin: false, user: null }
    }
    default: {
      return state
    }
  }
}

export default reducer
