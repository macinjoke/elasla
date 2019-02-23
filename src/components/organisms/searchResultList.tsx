import { unix } from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { CONFIG } from '../../constants'
import { Source } from '../../state/elastic/reducers'
import { State } from '../../types'

interface Props {
  sources: Source[]
}

  private url = `https://${CONFIG.slack.workspace}.slack.com`
class SearchResultList extends React.Component<Props> {
  public render() {
    const { sources } = this.props
    return (
      <div>
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
    )
  }
  private unixToFormatted = (str: string): string => {
    return unix(parseFloat(str)).format('YYYY/M/D HH:mm(ddd)')
  }
}

export default connect((s: State) => ({
  sources: s.elastic.sources,
}))(SearchResultList)
