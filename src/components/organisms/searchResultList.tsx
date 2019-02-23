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
      <div>
        {sources.map(source => (
          <SearchResult source={source} />
        ))}
      </div>
    )
  }
}

export default connect((s: State) => ({
  sources: s.elastic.sources,
}))(SearchResultList)
