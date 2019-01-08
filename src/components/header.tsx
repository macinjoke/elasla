import React from 'react'
import { logout } from '../state/auth/operations'
import { State } from '../types'

interface Props {
  isLogin: boolean
  logout: () => void
}

class Header extends React.Component<Props> {
  public render() {
    const { isLogin, logout } = this.props
    return (
      <div>
        <h1>elasla</h1>
        {isLogin && <button onClick={logout}>Logout</button>}
      </div>
    )
  }
}

export default Header
