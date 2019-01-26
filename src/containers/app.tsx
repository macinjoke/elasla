import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { connect } from 'react-redux'
import SignUpDialog from '../containers/signUpDialog'
import * as actions from '../state/auth/operations'
import { Content, Header } from './'

interface Props {
  fetchLoginState: () => void
}

class App extends React.Component<Props> {
  public componentWillMount() {
    const { fetchLoginState } = this.props
    fetchLoginState()
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
  null,
  {
    fetchLoginState: actions.fetchLoginState,
  },
)(App)
