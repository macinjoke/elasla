import { State as AuthState } from '../state/auth/reducers'
import { State as DialogState } from '../state/dialog/reducers'
import { State as ElasticState } from '../state/elastic/reducers'
import { State as MailCompleteDialogState } from '../state/mailCompleteDialog/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
  dialog: DialogState
  mailCompleteDialog: MailCompleteDialogState
}
