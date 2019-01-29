import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { State, User } from './reducers'

const create = actionCreatorFactory('auth')
const createAsync = asyncFactory<State>(create)

interface LoginPrams {
  username: string
  password: string
}

export const login = createAsync<LoginPrams, User>('Login', async params => {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`)
  }
  return res.json()
})

export const fetchSession = createAsync<{}, User>('FetchSession', async () => {
  const jwt = localStorage.getItem('jwt')
  if (!jwt) {
    throw new Error(`jwt does not exist`)
  }
  const res = await fetch('http://localhost:3000/api/login', {
    headers: { authorization: `Bearer ${jwt}` },
  })
  if (!res.ok) {
    localStorage.removeItem('jwt')
    throw new Error(`${res.status}: ${res.statusText}`)
  }
  return res.json()
})
