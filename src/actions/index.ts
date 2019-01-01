import { Action, ActionCreator } from 'redux'

export const hogeAction = (): Action<string> => ({
  type: 'hogeAction',
})
