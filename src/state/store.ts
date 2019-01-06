// @flow
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './auth/reducers'
import elasticReducer from './elastic/reducers'

const reducer = combineReducers({
  auth: authReducer,
  elastic: elasticReducer,
})

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
}
