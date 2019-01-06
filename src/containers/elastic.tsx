import { Client, SearchResponse } from 'elasticsearch'
import { Moment, unix } from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { CONFIG } from '../constants'
import * as actions from '../state/elastic/actions'
import * as thunkActions from '../state/elastic/operations'
import { Source, State as ElasticState } from '../state/elastic/reducers'
import { State } from '../state/store'

interface DispatchProps {
  updateText: (text: string) => void
  search: () => void
}

type StateProps = ElasticState

type Props = DispatchProps & ElasticState

class Elastic extends React.Component<Props> {
  private url = `https://${CONFIG.slack.workspace}.slack.com`
  public render() {
    const { text, sources } = this.props
    return (
      <div>
        <h2>Elastic</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={this.handleChange}
            placeholder="search text"
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h3>result</h3>
          {sources.map(source => (
            <div style={{ border: 'solid 0.1rem black' }}>
              <p>
                <a href={`${this.url}/messages/${source.channel_name}`}>
                  {source.channel_name}
                </a>
              </p>
              <p>
                <a
                  // TODO ひとまずgeneralのチャンネル IDにしてある
                  href={`${this.url}/messages/C02TM1NRB/team/${source.user}`}
                  target="_blank"
                >
                  {source.user_name}
                </a>{' '}
                <a
                  href={`${this.url}/archives/${source.channel_name}/p${
                    source.ts
                  }`}
                  target="_blank"
                >
                  {this.unixToFormatted(source.ts)}
                </a>
              </p>
              <p>{source.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  private unixToFormatted = (str: string): string => {
    return unix(parseFloat(str)).format('YYYY/M/D HH:mm(ddd)')
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.search()
  }

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { updateText } = this.props
    updateText(e.currentTarget.value)
  }
  private search = async (text: string) => {
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
            text,
          },
        },
      },
    })
    return response
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  s => s.elastic,
  { ...actions, ...thunkActions },
)(Elastic)
