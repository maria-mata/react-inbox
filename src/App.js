import React, { Component } from 'react';
import Toolbar from './components/toolbar'
import MessageList from './components/message-list';
const url = 'https://immense-oasis-78157.herokuapp.com/api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { emails: [] }
  }

  componentDidMount() {
    fetch(`${url}/messages`)
    .then(data => data.json())
    .then(response => {
      this.setState({emails: response._embedded.messages});
    })
  }

  toggleStar(email) {
    const data = {
      "messageIds" : [email.id],
      "command" : "star",
      "star" : !email.starred
    }
    const settings = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(`${url}/messages`, settings)
    .then(response => {
      if(response.ok) {
        this.setState(prevState => {
          const index = prevState.emails.indexOf(email);
          prevState.emails[index].starred = !prevState.emails[index].starred
          return prevState
        })
      }
    })
  }

  toggleSelect(email) {
    this.setState(prevState => {
      const index = prevState.emails.indexOf(email);
      prevState.emails[index].selected = !prevState.emails[index].selected
      return prevState
    })
  }

  render() {
    return (
      <main className="container">
        <Toolbar emails={this.state.emails} />
        <MessageList emails={this.state.emails}
          toggleStar={this.toggleStar.bind(this)}
          toggleSelect={this.toggleSelect.bind(this)} />
      </main>
    )
  }
}

export default App;
