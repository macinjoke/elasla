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
      return { ...state, isLoginError: true }
    }
    case FETCH_LOGIN_STATE_FAILURE: {
      return {
        ...state,
        isFetchLoginStateError: true,
      }
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
