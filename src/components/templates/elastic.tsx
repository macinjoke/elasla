import Typography from '@material-ui/core/Typography'
import React from 'react'
import styled from 'styled-components'
import SearchForm from '../organisms/searchForm'
import SearchResultList from '../organisms/searchResultList'

const Div = styled.div`
  padding: 10px;
`

class Elastic extends React.Component<{}> {
  public render() {
    return (
      <Div>
        <Typography variant="h3">Search</Typography>
        <SearchForm />
        <Typography variant="h4">Search Result</Typography>
        <SearchResultList />
      </Div>
    )
  }
}

export default Elastic
