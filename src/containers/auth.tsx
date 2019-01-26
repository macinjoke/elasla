import Button, { ButtonProps } from '@material-ui/core/Button'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as operations from '../state/auth/operations'
import { State } from '../types'

interface Props {
  login: (username: string, password: string) => void
  isLoginError: boolean
  isFetchLoginStateError: boolean
}

const StyledTextField = styled(TextField)`
  display: flex;
  width: 15rem;
` as React.ComponentType<TextFieldProps>

const StyledButton = styled(Button)`
  margin-top: 1rem;
` as React.ComponentType<ButtonProps>

const Div = styled.div`
  padding: 10px;
`

class Auth extends React.Component<Props> {
  public render() {
    const { isLoginError, isFetchLoginStateError } = this.props
    return (
      <Div>
        <h2>Auth</h2>
        <form onSubmit={this.handleSubmit}>
          <StyledTextField
            autoFocus
            id="username"
            label="Username"
            margin="dense"
          />
          <StyledTextField
            id="password"
            label="Password"
            margin="dense"
            type="password"
          />
          {isLoginError && <p>パスワードが違います</p>}
          {isFetchLoginStateError && (
            <p>セッションが切れました。もう一度ログインしてください。</p>
          )}
          <StyledButton variant="contained" type="submit">
            Login
          </StyledButton>
        </form>
      </Div>
    )
  }

  private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('submit')
    e.preventDefault()
    const { login } = this.props
    const target = e.currentTarget
    login(target.username.value, target.password.value)
  }
}

export default connect(
  (s: State) => ({
    isLoginError: s.auth.isLoginError,
    isFetchLoginStateError: s.auth.isFetchLoginStateError,
  }),
  { login: operations.login },
)(Auth)
