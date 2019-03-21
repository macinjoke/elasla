import Button from '@material-ui/core/Button'
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress'
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

const ButtonOrProgress = styled.div`
  width: 80px;
`

const _TextField = styled(TextField)`
  width: 100%;
` as ComponentType<TextFieldProps>

const _CircularProgress = styled(CircularProgress)`
  margin-left: 14px;
` as React.ComponentType<CircularProgressProps>

interface Props {
  search: (params: { text: string; jwt: string }) => void
  user: User
  isSearching: boolean
}

class SearchForm extends React.Component<Props> {
  public render() {
    const { isSearching } = this.props
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <_TextField autoFocus id="search" label="search" margin="dense" />
        <ButtonOrProgress>
          {isSearching ? (
            <_CircularProgress />
          ) : (
            <Button color="primary" type="submit">
              Search
            </Button>
          )}
        </ButtonOrProgress>
      </StyledForm>
    )
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { search, user, isSearching } = this.props
    if (isSearching) return
    search({ text: e.currentTarget.search.value, jwt: user.jwt || '' })
  }
}

export default connect(
  (s: State) => ({
    user: s.auth.user,
    isSearching: s.elastic.isSearching,
  }),
  { search: operations.search.action },
)(SearchForm)
