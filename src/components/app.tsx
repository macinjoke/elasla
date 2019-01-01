import React, { ChangeEvent } from 'react'
import Auth from "./auth";
import Elastic from "./elastic";


class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>elasla</h1>
        <Auth />
        <Elastic />
      </div>
    )
  }
}

export default App
