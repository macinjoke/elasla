import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { registerUser } from '../auth/operations'
import { changeFoo, closeDialog, openDialog } from './actions'

export type Foo = 'foo' | 'bar' | 'baz'

export interface State {
  isOpen: boolean
  status: 'default' | 'loading' | 'done'
  registeredUser?: string
  foo: Foo
}

const initialState: State = {
  isOpen: false,
  status: 'default',
  foo: 'foo',
}

const reducer = reducerWithInitialState(initialState)
  .case(openDialog, state => ({
    ...state,
    isOpen: true,
    status: 'default',
  }))
  .case(closeDialog, state => ({
    ...state,
    isOpen: false,
  }))
  .case(registerUser.async.started, (state: State) => ({
    ...state,
    status: 'loading',
  }))
  .case(registerUser.async.done, (state: State, { result: result }) => ({
    ...state,
    status: 'done',
    registeredUser: result.username,
  }))
  .case(changeFoo, (state, value) => {
    return {
      ...state,
      foo: value,
    }
  })

export default reducer
