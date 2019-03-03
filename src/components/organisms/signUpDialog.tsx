import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import React, { ChangeEvent, ComponentType, FormEvent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { registerUser as _registerUser } from '../../state/auth/operations'
import * as actions from '../../state/dialog/actions'
import { State as _State } from '../../types'

interface Props {
  isOpen: boolean
  closeSignUpDialog: () => void
  registerUser: (obj: { username: string; password: string }) => void
}

interface State {
  count: number
}

const P = styled.p`
  margin-top: 20px;
`

const Div = styled.div`
  display: flex;
`

const StyledTextField = styled(TextField)`
  min-width: 60px;
` as ComponentType<TextFieldProps>

class SignUpDialog extends React.Component<Props, State> {
  public state = {
    count: 0,
  }

  public render() {
    const { isOpen } = this.props
    return (
      <Dialog open={isOpen} onClose={this.handleClose}>
        <form onSubmit={this.handleSubmit}>
          <DialogTitle>新規登録</DialogTitle>
          <DialogContent>
            <DialogContentText>
              メールアドレスとパスワードを入力してください
            </DialogContentText>
            <Div>
              <StyledTextField
                style={{ width: `${this.state.count * 10}px` }}
                autoFocus
                id="email"
                label="Email"
                onChange={this.handleChange}
              />
              <P>@cps.im.dendai.ac.jp</P>
            </Div>
            <TextField name="password" label="Password" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              戻る
            </Button>
            <Button color="primary" type="submit">
              送信
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ count: e.currentTarget.value.length })
  }

  private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { registerUser } = this.props
    e.preventDefault()
    console.log(e)
    const target = e.currentTarget
    console.log(target.email.value)
    console.log(target.password.value)
    registerUser({
      username: target.email.value,
      password: target.password.value,
    })
  }

  private handleClose = () => {
    const { closeSignUpDialog } = this.props
    closeSignUpDialog()
  }
}

export default connect(
  (s: _State) => ({
    isOpen: s.dialog.isSignUpDialogOpen,
  }),
  {
    closeSignUpDialog: actions.closeSignUpDialog,
    registerUser: _registerUser.action,
  },
)(SignUpDialog)
