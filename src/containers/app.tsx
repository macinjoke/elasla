import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { connect } from 'react-redux'
import SignUpDialog from '../containers/signUpDialog'
import * as actions from '../state/auth/operations'
import { Content, Header } from './'

interface Props {
  fetchSession: () => Promise<{ username: string }>
}

class App extends React.Component<Props> {
  public async componentWillMount() {
    const { fetchSession } = this.props
    await fetchSession()
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
    fetchSession: actions.fetchSession.action,
  },
)(App)
