import { Action, AnyAction } from 'redux'

export const loginSuccess = (body: object): AnyAction => ({
  type: 'loginSuccess',
  body,
})

export const logoutState = (): Action<string> => ({ type: 'logoutState' })
