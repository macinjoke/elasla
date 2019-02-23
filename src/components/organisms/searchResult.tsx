import { unix } from 'moment'
import React from 'react'
import { CONFIG } from '../../constants'
import { Source } from '../../state/elastic/reducers'

interface Props {
  source: Source
}

class SearchResult extends React.Component<Props> {
  private url = `https://${CONFIG.slack.workspace}.slack.com`
  public render() {
    const { source } = this.props
    return (
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
            href={`${this.url}/archives/${source.channel_name}/p${source.ts}`}
            target="_blank"
          >
            {this.unixToFormatted(source.ts)}
          </a>
        </p>
        <p>{source.text}</p>
      </div>
    )
  }
  private unixToFormatted = (str: string): string => {
    return unix(parseFloat(str)).format('YYYY/M/D HH:mm(ddd)')
  }
}

export default SearchResult
