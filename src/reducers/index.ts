import { Action, Reducer } from 'redux'

export interface State {
  hoge: string
  isLogin: boolean
}

const initialState: State = {
  hoge: '',
  isLogin: false,
}

const reducer: Reducer<State, Action<string>> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'hogeAction': {
      return { ...state, hoge: state.hoge + 'h' }
    }
    case 'loginSuccess': {
      return { ...state, isLogin: !state.isLogin }
    }
    default: {
      return state
    }
  }
}

export default reducer
