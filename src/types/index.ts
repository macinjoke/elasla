import { State as AuthState } from '../state/auth/reducers'
import { State as ElasticState } from '../state/elastic/reducers'
import { State as MailCompleteDialogState } from '../state/mailCompleteDialog/reducers'
import { State as SignUpDialogState } from '../state/signUpDialog/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
  signUpDialog: SignUpDialogState
  mailCompleteDialog: MailCompleteDialogState
}
