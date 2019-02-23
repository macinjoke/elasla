import React from 'react'
import { connect } from 'react-redux'
import * as operations from '../../../state/elastic/operations'
import SearchResultList from '../searchResultList'

interface Props {
  search: (text: string) => void
}

class Elastic extends React.Component<Props> {
  public render() {
    return (
      <div>
        <h2>Elastic</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="search text" />
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h3>result</h3>
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
