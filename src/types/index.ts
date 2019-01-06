import { ThunkAction as ThunkThunkAction } from 'redux-thunk'
import { LoginSuccessAction, LogoutStateAction } from '../state/auth/actions'
import { State as AuthState } from '../state/auth/reducers'
import { SearchSuccessAction, UpdateTextAction } from '../state/elastic/actions'
import { State as ElasticState } from '../state/elastic/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
}

export type Action =
  | LoginSuccessAction
  | LogoutStateAction
  | SearchSuccessAction
  | UpdateTextAction

export type ThunkAction<R = void, E = undefined> = ThunkThunkAction<
  R,
  State,
  E,
  Action
>
