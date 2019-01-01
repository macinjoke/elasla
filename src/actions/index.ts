import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { State } from '../reducers'

export const hogeAction = (): Action<string> => ({
  type: 'hogeAction',
})

export const login = (
  username: string,
  password: string,
): ThunkAction<void, State, undefined, Action<string>> => async dispatch => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  console.log(response)
  if (response.status === 401) {
    console.log('パスワードが違います (本当はレンダリングしたい)')
  }
  if (response.status !== 200) {
    console.log(await response.text())
    return
  }
  dispatch(loginSuccess())
}

export const loginSuccess = (): Action<string> => ({
  type: 'loginSuccess',
})
