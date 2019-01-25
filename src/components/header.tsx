import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import styled from 'styled-components'

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
    const { isLogin, logout, openSignUpDialog } = this.props
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Title>elasla</Title>
          {isLogin ? (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={openSignUpDialog}>
              新規登録
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header
