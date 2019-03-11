import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { CONFIG } from '../../constants'
import { State, User } from './reducers'

const actionCreator = actionCreatorFactory('auth')
const createAsync = asyncFactory<State>(actionCreator)

interface LoginParams {
  username: string
  password: string
}

export const login = createAsync<LoginParams, User>('Login', async params => {
  const res = await fetch(
    `${CONFIG.backend.host}:${CONFIG.backend.port}/api/login`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    },
  )
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`)
  }
  return res.json()
})

export const fetchSession = createAsync<string, User>(
  'FetchSession',
  async jwt => {
    if (!jwt) {
      throw new Error(`jwt does not exist`)
    }
    const res = await fetch(
      `${CONFIG.backend.host}:${CONFIG.backend.port}/api/login`,
      {
        headers: { authorization: `Bearer ${jwt}` },
      },
    )
    if (!res.ok) {
      localStorage.removeItem('jwt')
      throw new Error(`${res.status}: ${res.statusText}`)
    }
    return res.json()
  },
)

interface RegisterParams {
  username: string
  password: string
}

export const registerUser = createAsync<RegisterParams, any>(
  'RegisterUser',
  async params => {
    const res = await fetch(
      `${CONFIG.backend.host}:${CONFIG.backend.port}/api/register`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      },
    )
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`)
    }
    return res.json()
  },
)
