import Typography from '@material-ui/core/Typography'
import React from 'react'
import SearchForm from '../organisms/searchForm'
import SearchResultList from '../organisms/searchResultList'

class Elastic extends React.Component<{}> {
  public render() {
    return (
      <div>
        <Typography variant="h3">Search</Typography>
        <SearchForm />
        <Typography variant="h4">Search Result</Typography>
        <SearchResultList />
      </div>
    )
  }
}

export default Elastic
