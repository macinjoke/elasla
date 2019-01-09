import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { State } from '../types'

interface Props {
  isLogin: boolean
  logout: () => void
  classes: {
    title: string
  }
}

const styles = {
  title: {
    flexGrow: 1,
  },
}

const Header: React.FC<Props> = props => {
  const { isLogin, logout, classes } = props
  return (
    <AppBar position="static">
      <Toolbar>
        <h1 className={classes.title}>elasla</h1>
        {isLogin && (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Header)
