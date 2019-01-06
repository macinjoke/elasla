import { Action as ReduxAction, AnyAction } from 'redux'
import { User } from './reducers'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  body: User
}
export const loginSuccess = (body: any): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  body,
})

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE
}
export const loginFailure = (): LoginFailureAction => ({
  type: LOGIN_FAILURE,
})

export const LOGOUT_STATE = 'LOGOUT_STATE'
export interface LogoutStateAction {
  type: typeof LOGOUT_STATE
}
export const logoutState = (): LogoutStateAction => ({ type: LOGOUT_STATE })

export type Action = LoginSuccessAction | LoginFailureAction | LogoutStateAction
