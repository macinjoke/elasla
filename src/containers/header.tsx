import React from 'react'
import { connect } from 'react-redux'
import { Header } from '../components'
import { logout } from '../state/auth/operations'
import { State as AuthState } from '../state/auth/reducers'
import { State } from '../types'

interface DispatchProps {
  logout: () => void
}

type StateProps = AuthState

export default connect<StateProps, DispatchProps, {}, State>(
  s => s.auth,
  { logout },
)(Header)
