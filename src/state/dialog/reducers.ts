import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { closeSignUpDialog, openSignUpDialog } from './actions'

export interface State {
  isSignUpDialogOpen: boolean
}

const initialState: State = {
  isSignUpDialogOpen: false,
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

export default reducer
