import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/auth'
import { State } from '../reducers'
import { State as AuthState } from '../reducers/auth'

interface DispatchProps {
  login: (username: string, password: string) => void
}

type StateProps = AuthState

type Props = DispatchProps & AuthState

class Auth extends React.Component<Props> {
  public handleLocalAuthClick = async () => {
    const data = {
      username: 'test',
      password: 'test',
    }
    const response = await fetch('http://localhost:3000/api/secure/local', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    console.log(response)
    const text = await response.text()
    console.log(text)
  }

  public fetchSomeData = async () => {
    const response = await fetch('http://localhost:3000/api/some_data')
    const data = await response.json()
    console.log(response)
    return data
  }

  public render() {
    return (
      <div>
        <h2>Auth</h2>
        <button onClick={this.handleLocalAuthClick}>local auth request</button>
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
          {/*{auth.error && <p>{auth.error}</p>}*/}
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

export default connect<StateProps, DispatchProps, {}, State>(
  s => s.auth,
  actions,
)(Auth)
