import { unix } from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { CONFIG } from '../constants'
import * as operations from '../state/elastic/operations'
import { Source } from '../state/elastic/reducers'
import { State } from '../types'

interface Props {
  search: (text: string) => void
  sources: Source[]
}

class Elastic extends React.Component<Props> {
  private url = `https://${CONFIG.slack.workspace}.slack.com`
  public render() {
    const { sources } = this.props
    return (
      <div>
        <h2>Elastic</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="search text" />
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
    this.props.search(e.currentTarget.search.value)
  }
}

export default connect(
  (s: State) => ({
    sources: s.elastic.sources,
  }),
  { search: operations.search },
)(Elastic)
