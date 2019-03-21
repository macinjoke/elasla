import Button from '@material-ui/core/Button'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { User } from '../../state/auth/reducers'
import * as operations from '../../state/elastic/operations'
import { State } from '../../types'

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 94vw;
`

const _TextField = styled(TextField)`
  width: 100%;
` as ComponentType<TextFieldProps>

interface Props {
  search: (params: { text: string; jwt: string }) => void
  user: User
}

class SearchForm extends React.Component<Props> {
  public render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <_TextField autoFocus id="search" label="search" margin="dense" />
        <Button color="primary" type="submit">
          Search
        </Button>
      </StyledForm>
    )
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { search, user } = this.props
    search({ text: e.currentTarget.search.value, jwt: user.jwt || '' })
  }
}

export default connect(
  (s: State) => ({
    user: s.auth.user,
  }),
  { search: operations.search.action },
)(SearchForm)
