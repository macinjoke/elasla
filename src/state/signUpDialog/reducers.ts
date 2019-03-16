import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { registerUser } from '../auth/operations'
import { closeDialog, openDialog } from './actions'

export interface State {
  isOpen: boolean
  status: 'default' | 'loading' | 'done'
  registeredUser?: string
}

const initialState: State = {
  isOpen: false,
  status: 'default',
}

const reducer = reducerWithInitialState(initialState)
  .case(openDialog, state => ({
    ...state,
    isOpen: true,
    status: 'default',
  }))
  .case(closeDialog, state => ({
    ...state,
    isOpen: false,
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
