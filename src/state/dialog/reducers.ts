import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { registerUser } from '../auth/operations'
import { closeSignUpDialog, openSignUpDialog } from './actions'

export interface State {
  isSignUpDialogOpen: boolean
  status: 'default' | 'loading' | 'done'
}

const initialState: State = {
  isSignUpDialogOpen: false,
  status: 'default',
}

const reducer = reducerWithInitialState(initialState)
  .case(openSignUpDialog, state => ({
    ...state,
    isSignUpDialogOpen: true,
  }))
  .case(closeSignUpDialog, state => ({
    ...state,
    isSignUpDialogOpen: false,
  }))
  .case(registerUser.async.started, (state: State) => ({
    ...state,
    status: 'loading',
  }))
  .case(registerUser.async.done, (state: State) => ({
    ...state,
    status: 'done',
  }))

export default reducer
