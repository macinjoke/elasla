import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { registerUser } from '../auth/operations'
import {
  closeRegistrationFinishDialog,
  closeSignUpDialog,
  openRegistrationFinishDialog,
  openSignUpDialog,
} from './actions'

export interface State {
  isSignUpDialogOpen: boolean
  isRegistrationFinishDialogOpen: boolean
  isLoading: boolean
}

const initialState: State = {
  isSignUpDialogOpen: false,
  isRegistrationFinishDialogOpen: false,
  isLoading: false,
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
  .case(openRegistrationFinishDialog, state => ({
    ...state,
    isRegistrationFinishDialogOpen: true,
  }))
  .case(closeRegistrationFinishDialog, (state: State) => ({
    ...state,
    isRegistrationFinishDialogOpen: false,
  }))
  .case(registerUser.async.started, (state: State) => ({
    ...state,
    isLoading: true,
  }))
  .case(registerUser.async.done, (state: State) => ({
    ...state,
    isLoading: false,
    isSignUpDialogOpen: false,
    isRegistrationFinishDialogOpen: true,
  }))

export default reducer
