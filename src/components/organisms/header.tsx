import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CONFIG } from '../../constants'
import { logout as _logout } from '../../state/auth/actions'
import { openDialog as _openDialog } from '../../state/signUpDialog/actions'
import { State } from '../../types'

interface Props {
  isLogin: boolean
  username?: string
  logout: () => void
  openDialog: () => void
}

const Title = styled(Typography)`
  flex-grow: 1;
` as ComponentType<TypographyProps>

class Header extends React.Component<Props> {
  public render() {
    const { isLogin, username } = this.props
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Title variant="h3" color="inherit">
            elasla
          </Title>
          {isLogin ? (
            <>
              <Typography color="textSecondary">
                {username}@{CONFIG.mail.domain}
              </Typography>
              <Button onClick={this.handleLogout} color="inherit">
                Logout
              </Button>
            </>
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
    const { openDialog } = this.props
    openDialog()
  }
}

export default connect(
  (s: State) => ({
    isLogin: s.auth.isLogin,
    username: s.auth.user.username,
  }),
  { logout: _logout, openDialog: _openDialog },
)(Header)
