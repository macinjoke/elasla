import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as operations from '../../state/elastic/operations'

const StyledForm = styled.form`
  display: flex;
  align-items: center;
`
interface Props {
  search: (text: string) => void
}

class SearchForm extends React.Component<Props> {
  public render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <TextField
          autoFocus
          id="search"
          label="search"
          margin="dense"
          fullWidth
        />
        <Button color="primary" type="submit">
          Search
        </Button>
      </StyledForm>
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