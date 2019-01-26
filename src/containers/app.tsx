import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../containers'
import SignUpDialog from '../containers/signUpDialog'
import * as actions from '../state/auth/operations'
import { State } from '../types'
import { Auth, Elastic } from './'

interface Props {
  fetchLoginState: () => void
  isLogin: boolean
}

class App extends React.Component<Props> {
  public componentWillMount() {
    const { fetchLoginState } = this.props
    fetchLoginState()
  }

  public render() {
    const { isLogin } = this.props
    return (
      <>
        <CssBaseline />
        <Header />
        {isLogin ? <Elastic /> : <Auth />}
        <SignUpDialog />
      </>
    )
  }
}

export default connect(
  (s: State) => ({
    isLogin: s.auth.isLogin,
  }),
  {
    fetchLoginState: actions.fetchLoginState,
  },
)(App)
