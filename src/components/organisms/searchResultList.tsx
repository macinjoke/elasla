import Divider from '@material-ui/core/Divider'
import List, { ListProps } from '@material-ui/core/List'
import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Source } from '../../state/elastic/reducers'
import { State } from '../../types'
import SearchResult from './searchResult'

const _List = styled(List)`
  width: 94vw;
` as ComponentType<ListProps>

interface Props {
  sources: Source[]
}

class SearchResultList extends React.Component<Props> {
  public render() {
    const { sources } = this.props
    return (
      <_List>
        {sources.map(source => (
          <>
            <SearchResult source={source} />
            <Divider />
          </>
        ))}
      </_List>
    )
  }
}

export default connect((s: State) => ({
  sources: s.elastic.sources,
}))(SearchResultList)
