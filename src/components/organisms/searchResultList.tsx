import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import React from 'react'
import { connect } from 'react-redux'
import { Source } from '../../state/elastic/reducers'
import { State } from '../../types'
import SearchResult from './searchResult'

interface Props {
  sources: Source[]
}

class SearchResultList extends React.Component<Props> {
  public render() {
    const { sources } = this.props
    return (
      <List>
        {sources.map(source => (
          <>
            <SearchResult source={source} />
            <Divider />
          </>
        ))}
      </List>
    )
  }
}

export default connect((s: State) => ({
  sources: s.elastic.sources,
}))(SearchResultList)
