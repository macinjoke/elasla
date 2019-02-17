import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { closeSignUpDialog, openSignUpDialog } from './actions'

export interface State {
  signUpDialog: boolean
}

const initialState: State = {
  signUpDialog: false,
}

const reducer = reducerWithInitialState(initialState)
  .case(openSignUpDialog as any, (state: any) => ({
    ...state,
    signUpDialog: true,
  }))
  .case(closeSignUpDialog, state => ({
    ...state,
    signUpDialog: false,
  }))

export default reducer
