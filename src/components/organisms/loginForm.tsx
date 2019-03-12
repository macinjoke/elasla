import Button, { ButtonProps } from '@material-ui/core/Button'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as operations from '../../state/auth/operations'
import { User } from '../../state/auth/reducers'
import { State } from '../../types'

interface Props {
  login: (loginParams: { username: string; password: string }) => Promise<User>
  loginError: Error | null
  fetchSessionError: Error | null
}

const StyledTextField = styled(TextField)`
  display: flex;
  width: 15rem;
` as React.ComponentType<TextFieldProps>

const StyledButton = styled(Button)`
  margin-top: 1rem;
` as React.ComponentType<ButtonProps>

class LoginForm extends React.Component<Props> {
  public render() {
    const { fetchSessionError, loginError } = this.props
    return (
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
        {loginError && (
          <Typography color="error">パスワードが違います</Typography>
        )}
        {fetchSessionError && (
          <Typography color="error">
            セッションが切れました。もう一度ログインしてください。
          </Typography>
        )}
        <StyledButton variant="contained" type="submit">
          Login
        </StyledButton>
      </form>
    )
  }

  private handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { login } = this.props
    const target = e.currentTarget
    await login({
      username: target.username.value,
      password: target.password.value,
    })
  }
}

export default connect(
  (s: State) => ({
    fetchSessionError: s.auth.fetchSessionError,
    loginError: s.auth.loginError,
  }),
  { login: operations.login.action },
)(LoginForm)
