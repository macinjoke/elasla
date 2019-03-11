import { CONFIG } from '../../constants'
import { Source, State } from './reducers'

import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const actionCreator = actionCreatorFactory('elastic')
const createAsync = asyncFactory<State>(actionCreator)

export const search = createAsync<{ text: string; jwt: string }, Source[]>(
  'Search',
  async params => {
    const res = await fetch(
      `${CONFIG.backend.host}:${CONFIG.backend.port}/api/search?q=${
        params.text
      }`,
      {
        headers: { authorization: `Bearer ${params.jwt}` },
      },
    )
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`)
    }
    return res.json()
  },
)
