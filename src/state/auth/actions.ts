import { Action as ReduxAction, AnyAction } from 'redux'
import { User } from './reducers'

export interface LoginSuccessAction {
  type: 'loginSuccess'
  body: User
}
export const loginSuccess = (body: any): LoginSuccessAction => ({
  type: 'loginSuccess',
  body,
})

export interface LoginFailureAction {
  type: 'loginFailure'
}
export const loginFailure = (): LoginFailureAction => ({ type: 'loginFailure' })

export interface LogoutStateAction {
  type: 'logoutState'
}
export const logoutState = (): LogoutStateAction => ({ type: 'logoutState' })

export type Action = LoginSuccessAction | LoginFailureAction | LogoutStateAction
