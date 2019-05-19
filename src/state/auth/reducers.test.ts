;(global as any).localStorage = { getItem: () => 'some jwt text' }
import reducerTester from 'reducer-tester'
import { logout } from './actions'
import { fetchSession, login } from './operations'
import reducer, { initialState } from './reducers'

reducerTester({
  reducer,
  state: initialState,
  tests: [
    logout(),
    login.async.started({ username: 'foo', password: 'bar' }),
    login.async.failed({
      params: { username: 'foo', password: 'bar' },
      error: new Error('some error'),
    }),
    login.async.done({
      params: {
        username: 'foo',
        password: 'bar',
      },
      result: {
        username: 'foo',
        isMailAuthed: true,
        jwt: 'some jwt text',
      },
    }),
    fetchSession.async.started('some jwt text'),
    fetchSession.async.done({
      params: 'some jwt text',
      result: { username: 'foo', isMailAuthed: true, jwt: 'some jwt text' },
    }),
    fetchSession.async.failed({
      params: 'some jwt text',
      error: new Error('some error'),
    }),
  ],
})
