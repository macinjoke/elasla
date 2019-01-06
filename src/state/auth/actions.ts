import { Action as ReduxAction, AnyAction } from 'redux'

export interface LoginSuccessAction {
  type: 'loginSuccess'
  body: object
}
export const loginSuccess = (body: object): LoginSuccessAction => ({
  type: 'loginSuccess',
  body,
})

export interface LogoutStateAction {
  type: 'logoutState'
}
export const logoutState = (): LogoutStateAction => ({ type: 'logoutState' })
