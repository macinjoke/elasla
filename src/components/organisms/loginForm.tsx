import Button from '@material-ui/core/Button'
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as operations from '../../state/auth/operations'
import { User } from '../../state/auth/reducers'
import { State } from '../../types'

interface Props {
  isLoginRequest: boolean
  loginError: Error | null
  fetchSessionError: Error | null
  login: (loginParams: { username: string; password: string }) => Promise<User>
}

const ButtonOrProgress = styled.div`
  margin-top: 16px;
`

const StyledTextField = styled(TextField)`
  display: flex;
  width: 15rem;
` as React.ComponentType<TextFieldProps>

const _CircularProgress = styled(CircularProgress)`
  margin-left: 14px;
` as React.ComponentType<CircularProgressProps>

class LoginForm extends React.Component<Props> {
  public render() {
    const { isLoginRequest, fetchSessionError, loginError } = this.props
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
        <ButtonOrProgress>
          {isLoginRequest ? (
            <_CircularProgress />
          ) : (
            <Button variant="contained" type="submit">
              Login
            </Button>
          )}
        </ButtonOrProgress>
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
    isLoginRequest: s.auth.isLoginRequest,
    loginError: s.auth.loginError,
    fetchSessionError: s.auth.fetchSessionError,
  }),
  { login: operations.login.action },
)(LoginForm)
