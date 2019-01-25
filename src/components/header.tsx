import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import styled from 'styled-components'

interface Props {
  isLogin: boolean
  logout: () => void
}

const Title = styled.h1`
  flex-grow: 1;
`

const Header: React.FC<Props> = props => {
  const { isLogin, logout } = props
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Title>elasla</Title>
        {isLogin && (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
