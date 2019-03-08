import Typography from '@material-ui/core/Typography'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CONFIG } from '../../constants'
import { User } from '../../state/auth/reducers'
import { State } from '../../types'
import Elastic from '../templates/elastic'
import Login from '../templates/login'

interface Props {
  isLogin: boolean
  user: User
}

const Div = styled.div`
  max-width: 900px;
  min-width: 600px;
  margin: auto;
`

class Content extends React.Component<Props> {
  public render() {
    const { isLogin, user } = this.props
    return (
      <Div>
        {isLogin ? (
          user.isMailAuthed ? (
            <Elastic />
          ) : (
            <div>
              <Typography>
                メール認証が済んでいません。
                <br />
                {user.username}@{CONFIG.mail.domain}{' '}
                に届いているメールを確認してください。
              </Typography>
            </div>
          )
        ) : (
          <Login />
        )}
      </Div>
    )
  }
}

export default connect((s: State) => ({
  isLogin: s.auth.isLogin,
  user: s.auth.user,
}))(Content)
