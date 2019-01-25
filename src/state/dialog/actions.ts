export const OPEN_SIGNUP_DIALOG = 'dialog/OPEN_SIGNUP_DIALOG'
export interface OpenSignUpDialog {
  type: typeof OPEN_SIGNUP_DIALOG
}
export const openSignUpDialog = (): OpenSignUpDialog => ({
  type: OPEN_SIGNUP_DIALOG,
})

export const CLOSE_SIGNUP_DIALOG = 'dialog/CLOSE_SIGNUP_DIALOG'
export interface CloseSignUpDialog {
  type: typeof CLOSE_SIGNUP_DIALOG
}
export const closeSignUpDialog = (): CloseSignUpDialog => ({
  type: CLOSE_SIGNUP_DIALOG,
})

export type Action = OpenSignUpDialog | CloseSignUpDialog
