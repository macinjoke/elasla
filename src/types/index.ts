import { ThunkAction as _ThunkAction } from 'redux-thunk'
import { Action as AuthAction } from '../state/auth/actions'
import { State as AuthState } from '../state/auth/reducers'
import { Action as ElasticAction } from '../state/elastic/actions'
import { State as ElasticState } from '../state/elastic/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
}

export type Action = AuthAction | ElasticAction

export type ThunkAction<R = void, E = undefined> = _ThunkAction<
  R,
  State,
  E,
  Action
>
