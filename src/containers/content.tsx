import React from 'react'
import { connect } from 'react-redux'
import { State } from '../types'
import { Auth, Elastic } from './'

interface Props {
  isLogin: boolean
}

class Content extends React.Component<Props> {
  public render() {
    const { isLogin } = this.props
    return <div>{isLogin ? <Elastic /> : <Auth />}</div>
  }
}

export default connect((s: State) => ({
  isLogin: s.auth.isLogin,
}))(Content)
