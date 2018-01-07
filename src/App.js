import React, { Component } from 'react';
import Toolbar from './components/toolbar'
import MessageList from './components/message-list';
const url = 'https://immense-oasis-78157.herokuapp.com/api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emails: [],
      bulkCheckbox: () => this.state.emails.every(email => email.selected),
      emptyCheckbox: () => this.state.emails.every(email => !email.selected)
    }
  }

  componentDidMount() {
    fetch(`${url}/messages`)
    .then(data => data.json())
    .then(response => {
      this.setState({...this.state, emails: response._embedded.messages});
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

  bulkSelect() {
    this.setState(prevState => {
      if (prevState.bulkCheckbox()) {
        prevState.emails.forEach(email => email.selected = false)
      } else {
        prevState.emails.forEach(email => email.selected = true)
      }
      return prevState
    })
  }

  toggleRead(value) {
    this.setState(prevState => {
      const ids = prevState.emails.reduce((ids, email) => {
        if (email.selected) {
          email.read = value
          ids.push(Number(email.id))
        }
        return ids
      }, [])

      const data = {
        "messageIds" : ids,
        "command" : "read",
        "read" : value
      };
      const settings = {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(`${url}/messages`, settings)
      .then(response => {
        if(response.ok){
          console.log(response)
        }
      })
      return prevState
    })
  }

  render() {
    return (
      <main className="container">
        <Toolbar
          emails={this.state.emails}
          bulkSelect={this.bulkSelect.bind(this)}
          bulkCheckbox={this.state.bulkCheckbox}
          emptyCheckbox={this.state.emptyCheckbox}
          toggleRead={this.toggleRead.bind(this)}
          
           />

        <MessageList
          emails={this.state.emails}
          toggleStar={this.toggleStar.bind(this)}
          toggleSelect={this.toggleSelect.bind(this)} />
      </main>
    )
  }
}

export default App;
