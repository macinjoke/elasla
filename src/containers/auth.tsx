import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import * as operations from '../state/auth/operations'
import { State } from '../types'

interface Props {
  login: (username: string, password: string) => void
  isLoginError: boolean
  isFetchLoginStateError: boolean
}

class Auth extends React.Component<Props> {
  public render() {
    const { isLoginError, isFetchLoginStateError } = this.props
    return (
      <div>
        <h2>Auth</h2>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <p>Username</p>
              <p>
                <input type="text" name="username" required />
              </p>
            </li>
            <li>
              <p>Password</p>
              <p>
                <input type="password" name="password" required />
              </p>
            </li>
          </ul>
          {isLoginError && <p>パスワードが違います</p>}
          {isFetchLoginStateError && (
            <p>セッションが切れました。もう一度ログインしてください。</p>
          )}
          <input type="submit" value="Send" />
        </form>
      </div>
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
