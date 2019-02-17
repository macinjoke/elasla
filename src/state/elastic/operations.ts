import { Client, SearchResponse } from 'elasticsearch'
import { CONFIG } from '../../constants'
import { Source, State } from './reducers'

import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const actionCreator = actionCreatorFactory('elastic')
const createAsync = asyncFactory<State>(actionCreator)

const { host, port } = CONFIG.elasticsearch
const client = new Client({
  host: `${host}:${port}`,
  log: 'trace',
})

export const search = createAsync<string, SearchResponse<Source>>(
  'Search',
  async text => {
    const res: SearchResponse<Source> = await client.search({
      index: 'slack-*',
      type: 'slack-message',
      body: {
        query: {
          match: {
            text,
          },
        },
      },
    })
    return res
  },
)
