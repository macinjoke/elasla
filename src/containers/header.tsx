import { connect } from 'react-redux'
import { Header } from '../components'
import { logout } from '../state/auth/operations'
import { State } from '../types'

export default connect(
  (s: State) => ({
    isLogin: s.auth.isLogin,
  }),
  { logout },
)(Header)
