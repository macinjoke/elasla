import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { connect } from 'react-redux'
import { CONFIG } from '../../constants'
import * as actions from '../../state/dialog/actions'
import { State } from '../../types'
import SignUpForm from './signUpForm'

interface Props {
  isOpen: boolean
  status: 'default' | 'loading' | 'done'
  registeredUser: string
  closeDialog: () => void
}

class SignUpDialog extends React.Component<Props> {
  public render() {
    const { isOpen, status, registeredUser } = this.props
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
                    {registeredUser}@{CONFIG.mail.domain}{' '}
                    に届くメールを確認してください。
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
    const { closeDialog, status } = this.props
    if (status === 'loading') return
    closeDialog()
  }
}

export default connect(
  (s: State) => ({
    isOpen: s.dialog.isSignUpDialogOpen,
    status: s.dialog.status,
    registeredUser: s.dialog.registeredUser,
  }),
  {
    closeDialog: actions.closeSignUpDialog,
  },
)(SignUpDialog)
