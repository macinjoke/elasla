import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { closeDialog, openDialog } from './actions'

export interface State {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false,
}

const reducer = reducerWithInitialState(initialState)
  .case(openDialog, state => ({
    ...state,
    isOpen: true,
  }))
  .case(closeDialog, state => ({
    ...state,
    isOpen: false,
  }))

export default reducer
