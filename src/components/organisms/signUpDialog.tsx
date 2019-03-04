import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../state/dialog/actions'
import { State } from '../../types'
import SignUpForm from './signUpForm'

interface Props {
  isOpen: boolean
  status: 'default' | 'loading' | 'done'
  closeDialog: () => void
}

class SignUpDialog extends React.Component<Props> {
  public render() {
    const { isOpen, status } = this.props
    return (
      <Dialog open={isOpen} onClose={this.handleClose}>
        {
          {
            default: <SignUpForm />,
            loading: (
              <DialogContent>
                <CircularProgress />
              </DialogContent>
            ),
            done: (
              <>
                <DialogTitle>登録完了</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    登録したメールアドレスに届くメールを確認してください。
                  </DialogContentText>
                </DialogContent>
              </>
            ),
          }[status]
        }
      </Dialog>
    )
  }

  private handleClose = () => {
    const { closeDialog } = this.props
    closeDialog()
  }
}

export default connect(
  (s: State) => ({
    isOpen: s.dialog.isSignUpDialogOpen,
    status: s.dialog.status,
  }),
  {
    closeDialog: actions.closeSignUpDialog,
  },
)(SignUpDialog)
