import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Auth from '../components/auth'
import Elastic from '../components/elastic'
import { State } from '../reducers'

interface DispatchProps {
  login: (username: string, password: string) => void
  fetchLoginState: () => void
  logout: () => void
}

type StateProps = State

type Props = DispatchProps & StateProps

class App extends React.Component<Props> {
  public componentWillMount() {
    const { fetchLoginState } = this.props
    fetchLoginState()
  }

  public render() {
    const { isLogin, login, logout, user } = this.props
    return (
      <div>
        <h1>elasla</h1>
        {isLogin ? (
          [<Elastic />, <button onClick={logout}>Logout</button>]
        ) : (
          <Auth isLogin={isLogin} login={login} />
        )}
        <h2>User Info</h2>
        {user && (
          <div>
            <p>username: {user.username}</p>
            <p>password: {user.password}</p>
            <p>jwt: {user.jwt}</p>
          </div>
        )}
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  s => s,
  actions,
)(App)
