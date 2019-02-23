import Typography from '@material-ui/core/Typography'
import React from 'react'
import styled from 'styled-components'
import LoginForm from '../loginForm'

const Div = styled.div`
  padding: 10px;
`

class Login extends React.Component<{}> {
  public render() {
    return (
      <Div>
        <Typography variant="h3">Login</Typography>
        <LoginForm />
      </Div>
    )
  }
}

export default Login
