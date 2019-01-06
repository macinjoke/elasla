import { Action } from 'redux'
import { State, ThunkAction } from '../../types'
import { loginFailure, loginSuccess, logoutState } from './actions'

export const login = (
  username: string,
  password: string,
): ThunkAction => async dispatch => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (response.status === 401) {
    dispatch(loginFailure())
  }
  if (response.status !== 200) {
    console.log(await response.text())
    return
  }
  const body = await response.json()
  localStorage.setItem('jwt', body.jwt)
  dispatch(loginSuccess(body))
}

export const fetchLoginState = (): ThunkAction => async dispatch => {
  const jwt = localStorage.getItem('jwt')
  if (!jwt) return

  const response = await fetch('http://localhost:3000/api/login', {
    headers: { authorization: `Bearer ${jwt}` },
  })
  // localStorage.jwt が有効なものではなかった場合削除する
  if (response.status === 400 || response.status === 401) {
    localStorage.removeItem('jwt')
    return
  }
  if (response.status !== 200) return
  const body = await response.json()
  dispatch(loginSuccess({ ...body, jwt }))
}

export const logout = (): ThunkAction => dispatch => {
  localStorage.removeItem('jwt')
  dispatch(logoutState())
}
