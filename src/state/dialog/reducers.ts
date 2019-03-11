import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { registerUser } from '../auth/operations'
import { closeSignUpDialog, openSignUpDialog } from './actions'

export interface State {
  isSignUpDialogOpen: boolean
  status: 'default' | 'loading' | 'done'
  registeredUser?: string
}

const initialState: State = {
  isSignUpDialogOpen: false,
  status: 'default',
}

const reducer = reducerWithInitialState(initialState)
  .case(openSignUpDialog, state => ({
    ...state,
    isSignUpDialogOpen: true,
    status: 'default',
  }))
  .case(closeSignUpDialog, state => ({
    ...state,
    isSignUpDialogOpen: false,
  }))
  .case(registerUser.async.started, (state: State) => ({
    ...state,
    status: 'loading',
  }))
  .case(registerUser.async.done, (state: State, { result: result }) => ({
    ...state,
    status: 'done',
    registeredUser: result.username,
  }))

export default reducer
