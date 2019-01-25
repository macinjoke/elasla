import { ThunkAction as _ThunkAction } from 'redux-thunk'
import { Action as AuthAction } from '../state/auth/actions'
import { State as AuthState } from '../state/auth/reducers'
import { Action as DialogAction } from '../state/dialog/actions'
import { State as DialogState } from '../state/dialog/reducers'
import { Action as ElasticAction } from '../state/elastic/actions'
import { State as ElasticState } from '../state/elastic/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
  dialog: DialogState
}

export type Action = AuthAction | ElasticAction | DialogAction

export type ThunkAction<R = void, E = undefined> = _ThunkAction<
  R,
  State,
  E,
  Action
>
