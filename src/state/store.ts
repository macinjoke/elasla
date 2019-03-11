// @flow
import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch,
  Store,
} from 'redux'
import thunk from 'redux-thunk'
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

const localStorageMiddleware = (store: Store) => (next: Dispatch) => (
  action: Action,
) => {
  const prevState = store.getState()
  const prevJwt = prevState.auth.user && prevState.auth.user.jwt
  next(action)
  const nextState = store.getState()
  const nextJwt = nextState.auth.user && nextState.auth.user.jwt
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
