import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { State } from '../../types'
import Elastic from '../templates/elastic'
import Login from '../templates/login'

interface Props {
  isLogin: boolean
}

const Div = styled.div`
  width: 900px;
  margin: auto;
`

class Content extends React.Component<Props> {
  public render() {
    const { isLogin } = this.props
    return <Div>{isLogin ? <Elastic /> : <Login />}</Div>
  }
}

export default connect((s: State) => ({
  isLogin: s.auth.isLogin,
}))(Content)
