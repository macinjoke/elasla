import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { logout as _logout } from '../../state/auth/actions'
import { openSignUpDialog as _openSignUpDialog } from '../../state/dialog/actions'
import { State } from '../../types'

interface Props {
  isLogin: boolean
  logout: () => void
  openSignUpDialog: () => void
}

const Title = styled.h1`
  flex-grow: 1;
`

class Header extends React.Component<Props> {
  public render() {
    const { isLogin } = this.props
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Title>elasla</Title>
          {isLogin ? (
            <Button onClick={this.handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={this.handleSignUpButton}>
              新規登録
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
  private handleLogout = () => {
    const { logout } = this.props
    logout()
  }
  private handleSignUpButton = () => {
    const { openSignUpDialog } = this.props
    openSignUpDialog()
  }
}

export default connect(
  (s: State) => ({
    isLogin: s.auth.isLogin,
  }),
  { logout: _logout, openSignUpDialog: _openSignUpDialog },
)(Header)
