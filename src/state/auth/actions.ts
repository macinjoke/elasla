import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('auth')

export const logout = actionCreator('LOGOUT')
