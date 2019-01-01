import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Auth from '../components/auth'
import Elastic from '../components/elastic'
import { State } from '../reducers'

interface DispatchProps {
  hogeAction: () => void
  login: (username: string, password: string) => void
}

type StateProps = State

type Props = DispatchProps & StateProps

class App extends React.Component<Props> {
  public render() {
    const { hoge, isLogin, login } = this.props
    return (
      <div>
        <h1>elasla</h1>
        {isLogin ? <Elastic /> : <Auth isLogin={isLogin} login={login} />}
        <button onClick={this.hoge}>hoge</button>
        <p>{hoge}</p>
      </div>
    )
  }
  private hoge = () => {
    const { hogeAction } = this.props
    hogeAction()
  }
}

export default connect<StateProps, DispatchProps, {}, State>(
  s => s,
  actions,
)(App)
