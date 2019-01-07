import React from 'react'

interface Props {
  logout: () => void
  isLogin: boolean
}

const Header = (props: Props) => {
  const { isLogin, logout } = props
  return (
    <div>
      <h1>elasla</h1>
      {isLogin && <button onClick={logout}>Logout</button>}
    </div>
  )
}

export default Header
