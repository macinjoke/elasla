import React from 'react'

class Auth extends React.Component {
  public handleLocalAuthClick = async () => {
    const data = {
      username: 'test',
      password: 'test',
    }
    const response = await fetch('http://localhost:3000/api/secure/local', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    console.log(response)
    const text = await response.text()
    console.log(text)
  }

  public fetch_some_data = async () => {
    const response = await fetch('http://localhost:3000/api/some_data')
    const data = await response.json()
    console.log(response)
    return data
  }

  public render() {
    return (
      <div>
        <h2>Auth</h2>
        <button onClick={this.handleLocalAuthClick}>local auth request</button>
        <form action="http://localhost:3000/api/secure/local" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
            <br />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default Auth
