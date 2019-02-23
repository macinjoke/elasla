import Typography from '@material-ui/core/Typography'
import React from 'react'
import { connect } from 'react-redux'
import * as operations from '../../state/elastic/operations'
import SearchResultList from '../organisms/searchResultList'

interface Props {
  search: (text: string) => void
}

class Elastic extends React.Component<Props> {
  public render() {
    return (
      <div>
        <Typography variant="h3">Search</Typography>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="search text" />
          <input type="submit" value="Submit" />
        </form>
        <div>
          <Typography variant="h4">Search Result</Typography>
          <SearchResultList />
        </div>
      </div>
    )
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.search(e.currentTarget.search.value)
  }
}

export default connect(
  null,
  { search: operations.search.action },
)(Elastic)
