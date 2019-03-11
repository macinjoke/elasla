import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { logout } from './actions'
import { fetchSession, login, registerUser } from './operations'

export interface User {
  username?: string
  isMailAuthed?: boolean
  jwt?: string
}

export interface State {
  isLogin: boolean
  user: User
  loginError: Error | null
  fetchSessionError: Error | null
}

const initialState: State = {
  isLogin: false,
  user: {
    jwt: localStorage.getItem('jwt') || '',
  },
  loginError: null,
  fetchSessionError: null,
}

const refreshError = (state: State): State => {
  return { ...state, loginError: null, fetchSessionError: null }
}

const reducer = reducerWithInitialState(initialState)
  .case(logout, state => ({
    ...refreshError(state),
    isLogin: false,
    user: {},
  }))
  .case(login.async.failed, (state, { error }) => {
    // TODO 503 とかコネクションエラーのときに違うの出す
    return {
      ...refreshError(state),
      isLogin: false,
      loginError: error,
    }
  })
  .case(login.async.done, (state, { result: user }) => ({
    ...state,
    isLogin: true,
    user,
  }))
  .case(fetchSession.async.done, (state, { result: user }) => ({
    ...state,
    isLogin: true,
    user,
  }))
  .case(fetchSession.async.failed, (state, { error }) => {
    if (error.message === 'jwt does not exist') {
      return state
    }
    return {
      ...refreshError(state),
      fetchSessionError: error,
      user: { jwt: '' },
    }
  })
  .case(registerUser.async.done, (state, { result: result }) => ({
    ...state,
    result,
  }))

export default reducer
