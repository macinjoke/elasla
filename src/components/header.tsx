import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../state/auth/operations'
import { State as AuthState } from '../state/auth/reducers'
import { State } from '../types'

interface DispatchProps {
  logout: () => void
}

type StateProps = AuthState

type Props = DispatchProps & StateProps

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
