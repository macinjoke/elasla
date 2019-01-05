import { Client, SearchResponse } from 'elasticsearch'
import { Moment, unix } from 'moment'
import React from 'react'
import { CONFIG } from '../constants'
import { Source } from '../reducers'

interface Props {
  updateText: (text: string) => void
  search: () => void
  text: string
  sources: Source[]
}

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

export default Elastic
