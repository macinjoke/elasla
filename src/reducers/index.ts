import { Action, combineReducers, Reducer } from 'redux'
import authReducer, { State as AuthState } from './auth'
import elasticReducer, { State as ElasticState } from './elastic'

export interface State {
  auth: AuthState
  elastic: ElasticState
}

export default combineReducers({
  auth: authReducer,
  elastic: elasticReducer,
})
