import { Action, Reducer } from 'redux'

export interface State {
  hoge: string
}

const initialState: State = {
  hoge: '',
}

const reducer: Reducer<State, Action<string>> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'hogeAction': {
      return { ...state, hoge: state.hoge + 'h' }
    }
    default: {
      return state
    }
  }
}

export default reducer
