import { Action, Reducer } from 'redux'

export interface State {
  hoge: string
  isLogin: boolean
  user: {
    username: string
    password: string
    jwt: string
  }
}

const initialState: State = {
  hoge: '',
  isLogin: false,
  user: null,
}

const reducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case 'hogeAction': {
      return { ...state, hoge: state.hoge + 'h' }
    }
    case 'loginSuccess': {
      return { ...state, isLogin: true, user: action.body }
    }
    case 'logoutState': {
      return { ...state, isLogin: false, user: null }
    }
    default: {
      return state
    }
  }
}

export default reducer
