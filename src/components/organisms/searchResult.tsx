import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { unix } from 'moment'
import React from 'react'
import styled from 'styled-components'
import { CONFIG } from '../../constants'
import { Source } from '../../state/elastic/reducers'

const StyledTypography = styled(Typography)`
  overflow-wrap: break-word;
` as React.ComponentType<TypographyProps>

interface Props {
  source: Source
}

class SearchResult extends React.Component<Props> {
  private url = `https://${CONFIG.slack.workspace}.slack.com`
  public render() {
    const { source } = this.props
    return (
      <div style={{ border: 'solid 0.1rem black' }}>
        <Typography variant="h6">
          <a href={`${this.url}/messages/${source.channel_name}`}>
            {source.channel_name}
          </a>
        </Typography>
        <Typography variant="subtitle1">
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
        </Typography>
        <StyledTypography>{source.text}</StyledTypography>
      </div>
    )
  }
  private unixToFormatted = (str: string): string => {
    return unix(parseFloat(str)).format('YYYY/M/D HH:mm(ddd)')
  }
}

export default SearchResult
