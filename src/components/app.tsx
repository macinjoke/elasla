import { Client, SearchResponse } from 'elasticsearch'
import React, { ChangeEvent } from 'react'

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
              <a
                href={`https://iwailab.slack.com/messages/C02TM1NRB/team/${
                  source.user
                }`}
              >
                {source.user_name}
              </a>
              <p>{source.text}</p>
              <a
                href={`https://iwailab.slack.com/archives/${
                  source.channel_name
                }/p${source.ts}`}
              >
                link
              </a>
            </div>
          ))}
        </div>
      </div>
    )
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
    const client = new Client({
      host: 'localhost:9200',
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
