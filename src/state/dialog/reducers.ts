import { Reducer } from 'redux'
import { Action, CLOSE_SIGNUP_DIALOG, OPEN_SIGNUP_DIALOG } from './actions'

export interface State {
  signUpDialog: boolean
}

const initialState: State = {
  signUpDialog: false,
}

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIGNUP_DIALOG: {
      return { ...state, signUpDialog: true }
    }
    case CLOSE_SIGNUP_DIALOG: {
      return { ...state, signUpDialog: false }
    }
    default: {
      return state
    }
  }
}

export default reducer
