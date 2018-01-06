import React, { Component } from 'react';
import Toolbar from './components/toolbar'
import MessageList from './components/message-list';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emails: []
    }
    this.fetchEmails()
  }

  async fetchEmails() {
    const data = await fetch('https://immense-oasis-78157.herokuapp.com/api/messages')
    const response = await data.json()
    const emails = response._embedded.messages
    this.setState({emails})
  }

  render() {
    return (
      <div className="container">
        <Toolbar emails={this.state.emails} />
        <MessageList emails={this.state.emails} />
      </div>
    );
  }
}

export default App;
