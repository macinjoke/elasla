import { Client, SearchResponse } from 'elasticsearch'
import { Action } from 'redux'
import { CONFIG } from '../../constants'
import { ThunkAction } from '../../types'
import { searchSuccess } from './actions'
import { Source } from './reducers'

export const search = (): ThunkAction => async (dispatch, getState) => {
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
          text: getState().elastic.text,
        },
      },
    },
  })
  const sources = response.hits.hits.map((hit: any) => hit._source)
  dispatch(searchSuccess(sources))
}
