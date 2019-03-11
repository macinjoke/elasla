import { CONFIG } from '../../constants'
import { Source, State } from './reducers'

import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const actionCreator = actionCreatorFactory('elastic')
const createAsync = asyncFactory<State>(actionCreator)

export const search = createAsync<string, Source[]>('Search', async text => {
  const jwt = localStorage.getItem('jwt')
  const res = await fetch(
    `${CONFIG.backend.host}:${CONFIG.backend.port}/api/search?q=${text}`,
    {
      headers: { authorization: `Bearer ${jwt}` },
    },
  )
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`)
  }
  return res.json()
})
