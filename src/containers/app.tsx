import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../containers'
import SignUpDialog from '../containers/signUpDialog'
import * as actions from '../state/auth/operations'
import { User } from '../state/auth/reducers'
import { State } from '../types'
import { Auth, Elastic } from './'

interface Props {
  fetchLoginState: () => void
  isLogin: boolean
  user: User
}

class App extends React.Component<Props> {
  public componentWillMount() {
    const { fetchLoginState } = this.props
    fetchLoginState()
  }

  public render() {
    const { isLogin, user } = this.props
    return (
      <>
        <CssBaseline />
        <Header />
        {isLogin ? <Elastic /> : <Auth />}
        <h2>User Info</h2>
        {user && ( // デバッグ情報
          <div>
            <p>username: {user.username}</p>
          </div>
        )}
        <SignUpDialog />
      </>
    )
  }
}

export default connect(
  (s: State) => ({
    isLogin: s.auth.isLogin,
    user: s.auth.user,
  }),
  {
    fetchLoginState: actions.fetchLoginState,
  },
)(App)
