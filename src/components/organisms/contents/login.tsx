import React from 'react'
import styled from 'styled-components'
import LoginForm from '../loginForm'

interface Props {}

const Div = styled.div`
  padding: 10px;
`

class Login extends React.Component<Props> {
  public render() {
    return (
      <Div>
        <h2>Login</h2>
        <LoginForm />
      </Div>
    )
  }
}

export default Login
