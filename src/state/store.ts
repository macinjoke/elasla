import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
} from 'redux'
import thunk from 'redux-thunk'
import { State } from '../types'
import authReducer from './auth/reducers'
import dialogReducer from './dialog/reducers'
import elasticReducer from './elastic/reducers'

const reducer = combineReducers({
  auth: authReducer,
  elastic: elasticReducer,
  dialog: dialogReducer,
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: true,
    })
  : compose

// state.auth.user.jwt の値の変化に応じて localStorage を操作
const localStorageMiddleware: Middleware<
  {},
  State
> = store => next => action => {
  const prevJwt = store.getState().auth.user.jwt
  next(action)
  const nextJwt = store.getState().auth.user.jwt
  if (!nextJwt) {
    localStorage.removeItem('jwt')
    return
  }
  if (prevJwt !== nextJwt) {
    localStorage.setItem('jwt', nextJwt)
  }
}

export default function configureStore() {
  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, localStorageMiddleware)),
  )
}
