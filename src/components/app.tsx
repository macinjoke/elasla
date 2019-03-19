import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../state/auth/operations'
import { User } from '../state/auth/reducers'
import { openDialog as _openDialog } from '../state/mailCompleteDialog/actions'
import { State } from '../types'
import Content from './organisms/content'
import Header from './organisms/header'
import MailCompleteDialog from './organisms/mailCompleteDialog'
import SignUpDialog from './organisms/signUpDialog'

interface Props {
  openDialog: () => void
  fetchSession: (jwt: string) => Promise<User>
  user: User
  isFetchingSession: boolean
}

const _CircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 45%;
  left: 45%; // transform: translate(-50%, -50%) するとキモい動きになるので...;
` as ComponentType<CircularProgressProps>

class App extends React.Component<Props> {
  public async componentWillMount() {
    const { openDialog, fetchSession, user } = this.props
    const params = new URLSearchParams(location.search)
    if (params.get('mail') === 'ok') {
      openDialog()
      history.pushState(null, '', '.')
    }
    if (!user.jwt) return
    await fetchSession(user.jwt)
  }

  public render() {
    const { isFetchingSession } = this.props
    return (
      <>
        <CssBaseline />
        {isFetchingSession ? (
          <_CircularProgress />
        ) : (
          <>
            <Header />
            <Content />
          </>
        )}
        <SignUpDialog />
        <MailCompleteDialog />
      </>
    )
  }
}

export default connect(
  (s: State) => ({
    user: s.auth.user,
    isFetchingSession: s.auth.isFetchingSession,
  }),
  {
    fetchSession: actions.fetchSession.action,
    openDialog: _openDialog,
  },
)(App)
