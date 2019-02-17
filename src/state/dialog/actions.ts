import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('dialog')

export const openSignUpDialog = actionCreator('OPEN_SIGNUP_DIALOG')
export const closeSignUpDialog = actionCreator('CLOSE_SIGNUP_DIALOG')
