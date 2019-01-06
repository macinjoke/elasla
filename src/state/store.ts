// @flow
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import authReducer, { State as AuthState } from './auth/reducers'
import elasticReducer, { State as ElasticState } from './elastic/reducers'

export interface State {
  auth: AuthState
  elastic: ElasticState
}

const reducer = combineReducers({
  auth: authReducer,
  elastic: elasticReducer,
})

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
}
