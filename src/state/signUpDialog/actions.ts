import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('signUpDialog')

export const openDialog = actionCreator('OPEN_DIALOG')
export const closeDialog = actionCreator('CLOSE_DIALOG')
