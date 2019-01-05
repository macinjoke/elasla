import { Client, SearchResponse } from 'elasticsearch'
import { Action, ActionCreator, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { CONFIG } from '../constants'
import { Source, State } from '../reducers'

export const login = (
  username: string,
  password: string,
): ThunkAction<void, State, undefined, Action<string>> => async dispatch => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (response.status === 401) {
    console.log('パスワードが違います (本当はレンダリングしたい)')
  }
  if (response.status !== 200) {
    console.log(await response.text())
    return
  }
  const body = await response.json()
  localStorage.setItem('jwt', body.jwt)
  dispatch(loginSuccess(body))
}

export const loginSuccess = (body: object): AnyAction => ({
  type: 'loginSuccess',
  body,
})

export const fetchLoginState = (): ThunkAction<
  void,
  State,
  undefined,
  Action<string>
> => async dispatch => {
  const jwt = localStorage.getItem('jwt')
  if (!jwt) return

  const response = await fetch('http://localhost:3000/api/login', {
    headers: { authorization: `Bearer ${jwt}` },
  })
  if (response.status !== 200) {
    console.log(await response.json()) // TODO
  }
  const body = await response.json()
  dispatch(loginSuccess({ ...body, jwt }))
}

export const logout = (): ThunkAction<
  void,
  State,
  undefined,
  Action<string>
> => dispatch => {
  localStorage.removeItem('jwt')
  dispatch(logoutState())
}

export const logoutState = (): Action<string> => ({ type: 'logoutState' })

export const updateText = (text: string): AnyAction => ({
  type: 'updateText',
  text,
})

export const search = (): ThunkAction<
  void,
  State,
  undefined,
  Action<string>
> => async (dispatch, getState) => {
  const { host, port } = CONFIG.elasticsearch
  const client = new Client({
    host: `${host}:${port}`,
    log: 'trace',
  })
  const response: SearchResponse<Source> = await client.search({
    index: 'slack-*',
    type: 'slack-message',
    body: {
      query: {
        match: {
          text: getState().text,
        },
      },
    },
  })
  const sources = response.hits.hits.map((hit: any) => hit._source)
  dispatch(searchSuccess(sources))
}

export const searchSuccess = (sources: object): AnyAction => ({
  type: 'searchSuccess',
  sources,
})
