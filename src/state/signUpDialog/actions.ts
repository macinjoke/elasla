import actionCreatorFactory from 'typescript-fsa'
import { Foo } from './reducers'

const actionCreator = actionCreatorFactory('signUpDialog')

export const openDialog = actionCreator('OPEN_DIALOG')
export const closeDialog = actionCreator('CLOSE_DIALOG')

export const changeFoo = actionCreator<Foo>('changeFoo')
