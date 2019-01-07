import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { AnyAction, bindActionCreators } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Header } from '../components'
import * as actions from '../state/auth/operations'
import { State as AuthState } from '../state/auth/reducers'
import { State } from '../types'
import { Auth, Elastic } from './'

interface DispatchProps {
  fetchLoginState: () => void
  logout: () => void
}

type StateProps = AuthState

type Props = DispatchProps & StateProps

class App extends React.Component<Props> {
  public componentWillMount() {
    const { fetchLoginState } = this.props
    fetchLoginState()
  }

  public render() {
    const { isLogin, user, logout } = this.props
    return (
      <div>
        <Header logout={logout} isLogin={isLogin} />
        {isLogin ? <Elastic /> : <Auth />}
        <h2>User Info</h2>
        {user && ( // デバッグ情報
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
  s => s.auth,
  dispatch =>
    bindActionCreators(
      {
        fetchLoginState: actions.fetchLoginState,
        logout: actions.logout,
      },
      dispatch,
    ),
)(App)
