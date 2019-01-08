import React from 'react'
import { State } from '../types'

interface Props {
  isLogin: boolean
  logout: () => void
}

const Header: React.FC<Props> = props => {
  const { isLogin, logout } = props
  return (
    <div>
      <h1>elasla</h1>
      {isLogin && <button onClick={logout}>Logout</button>}
    </div>
  )
}

export default Header
