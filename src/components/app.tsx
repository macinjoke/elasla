import { Client, SearchResponse } from 'elasticsearch'
import { Moment, unix } from 'moment'
import React, { ChangeEvent } from 'react'
import { CONFIG } from '../constants'

interface Source {
  type: string
  user: string // user id
  text: string
  ts: string
  '@timestamp': string
  hour_of_day: number
  day_of_week: number
  user_name: string
  channel_name: string
}

interface State {
  inputValue: string
  sources: Source[]
}

class App extends React.Component<{}, State> {
  public state = { inputValue: '', sources: [] as Source[] }
  private url = 'https://iwailab.slack.com'
  public render() {
    return (
      <div>
        <h1>elasla</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="search text"
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h2>result</h2>
          {this.state.sources.map(source => (
            <div style={{ border: 'solid 0.1rem black' }}>
              <p>
                <a href={`${this.url}/messages/${source.channel_name}`}>
                  {source.channel_name}
                </a>
              </p>
              <p>
                <a
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

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await this.search(this.state.inputValue)
    const sources = response.hits.hits.map(hit => hit._source)
    this.setState({ sources })
  }

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.currentTarget.value })
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

export default App
