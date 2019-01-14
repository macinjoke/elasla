import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import * as operations from '../state/auth/operations'
import { State } from '../types'

interface Props {
  login: (username: string, password: string) => void
  loginErrorMessage: string
  fetchLoginStateErrorMessage: string
}

class Auth extends React.Component<Props> {
  public render() {
    const { loginErrorMessage, fetchLoginStateErrorMessage } = this.props
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
          {loginErrorMessage && <p>{loginErrorMessage}</p>}
          {fetchLoginStateErrorMessage && <p>{fetchLoginStateErrorMessage}</p>}
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
    loginErrorMessage: s.auth.loginErrorMessage,
    fetchLoginStateErrorMessage: s.auth.fetchLoginStateErrorMessage,
  }),
  { login: operations.login },
)(Auth)
