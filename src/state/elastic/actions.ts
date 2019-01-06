import { Client, SearchResponse } from 'elasticsearch'
import { Action, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { CONFIG } from '../../constants'
import { State } from '../store'
import { Source } from './reducers'

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
          text: getState().elastic.text,
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
