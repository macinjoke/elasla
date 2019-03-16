import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import { connect } from 'react-redux'
import { closeDialog as _closeDialog } from '../../state/mailCompleteDialog/actions'
import { State } from '../../types'

interface Props {
  isOpen: boolean
  closeDialog: () => void
}

class MailCompleteDialog extends React.Component<Props> {
  public render() {
    const { isOpen } = this.props
    return (
      <Dialog open={isOpen} onClose={this.handleClose}>
        <DialogTitle>メール登録完了</DialogTitle>
        <DialogContent>
          <DialogContentText>メールが認証されました。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            閉じる
          </Button>
        </DialogActions>
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
    isOpen: s.mailCompleteDialog.isOpen,
  }),
  { closeDialog: _closeDialog },
)(MailCompleteDialog)
