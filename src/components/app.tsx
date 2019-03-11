import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/auth/operations'
import { User } from '../state/auth/reducers'
import { State } from '../types'
import Content from './organisms/content'
import Header from './organisms/header'
import SignUpDialog from './organisms/signUpDialog'

interface Props {
  fetchSession: (jwt: string) => Promise<User>
  user: User
}

class App extends React.Component<Props> {
  public async componentWillMount() {
    const { fetchSession, user } = this.props
    const res = await fetchSession(user.jwt)
    console.log(res)
    localStorage.setItem('jwt', res.jwt)
  }

  public render() {
    return (
      <>
        <CssBaseline />
        <Header />
        <Content />
        <SignUpDialog />
      </>
    )
  }
}

export default connect(
  (s: State) => ({
    user: s.auth.user,
  }),
  {
    fetchSession: actions.fetchSession.action,
  },
)(App)
