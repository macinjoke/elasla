import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/dialog/actions'
import { State } from '../types'

interface Props {
  signUpDialog: boolean
  closeSignUpDialog: () => void
}

class SignUpDialog extends React.Component<Props> {
  public render() {
    const { signUpDialog, closeSignUpDialog } = this.props
    return (
      <Dialog open={signUpDialog} onClose={closeSignUpDialog}>
        <DialogTitle>だいあろぐたいとる</DialogTitle>
        <DialogContent>
          <DialogContentText>
            やあ。ここはDialogContentText さ。何か文句あるかい？
          </DialogContentText>
          <TextField autoFocus id="name" label="おれはlabel" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSignUpDialog} color="primary">
            戻る
          </Button>
          <Button onClick={closeSignUpDialog} color="primary">
            送信
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  (s: State) => ({
    signUpDialog: s.dialog.signUpDialog,
  }),
  { closeSignUpDialog: actions.closeSignUpDialog },
)(SignUpDialog)
