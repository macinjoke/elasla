import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { connect } from 'react-redux'
import { registerUser as _registerUser } from '../../state/auth/operations'
import * as actions from '../../state/dialog/actions'
import { State } from '../../types'

interface Props {
  isOpen: boolean
  closeDialog: () => void
}

class RegistrationFinishDialog extends React.Component<Props> {
  public render() {
    const { isOpen } = this.props
    return (
      <Dialog open={isOpen} onClose={this.handleClose}>
        <DialogTitle>登録完了</DialogTitle>
        <DialogContent>
          <DialogContentText>
            登録したメールアドレスに届くメールを確認してください。
          </DialogContentText>
        </DialogContent>
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
    isOpen: s.dialog.isRegistrationFinishDialogOpen,
  }),
  {
    closeDialog: actions.closeRegistrationFinishDialog,
  },
)(RegistrationFinishDialog)
