import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { connect } from 'react-redux'
import * as operations from '../../state/elastic/operations'

interface Props {
  search: (text: string) => void
}

class SearchForm extends React.Component<Props> {
  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField autoFocus id="search" label="search" margin="dense" />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
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
)(SearchForm)
