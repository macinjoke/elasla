import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('mailCompleteDialog')

export const openDialog = actionCreator('OPEN__DIALOG')
export const closeDialog = actionCreator('CLOSE_DIALOG')
