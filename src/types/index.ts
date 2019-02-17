import { State as AuthState } from '../state/auth/reducers'
import { Action as DialogAction } from '../state/dialog/actions'
import { State as DialogState } from '../state/dialog/reducers'
import { State as ElasticState } from '../state/elastic/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
  dialog: DialogState
}

export type Action = DialogAction
