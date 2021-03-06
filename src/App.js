import React, { Component } from 'react';
import Toolbar from './components/toolbar'
import Compose from './components/compose';
import MessageList from './components/message-list';
const url = 'https://immense-oasis-78157.herokuapp.com/api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emails: [],
      bulkCheckbox: () => this.state.emails.every(email => email.selected),
      emptyCheckbox: () => this.state.emails.every(email => !email.selected),
      showCompose: false,
      subject: "",
      body: ""
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
          ids.push(email.id)
        }
        return ids
      }, [])

      const data = {
        "messageIds": ids,
        "command": "read",
        "read": value
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
        if (response.ok) {
          console.log(response)
        }
      })
      return prevState
    })
  }

  deleteMessage() {
    this.setState(prevState => {
      const ids = []
      prevState.emails.forEach(email => {
        if (email.selected) {
          ids.push(email.id)
          prevState.emails.splice(prevState.emails.indexOf(email), 1)
        }
      })
      const data = {
        "messageIds" : ids,
        "command" : "delete"
      };
      console.log(data);
      const settings = {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(`${url}/messages`, settings)
      .then(response => {
        if (response.ok) {
          console.log(response);
        }
      })
      return prevState
    })
  }

  updateLabel(label, action) {
    this.setState(prevState => {
      const ids = prevState.emails.reduce((ids, email) => {
        if (action === "addLabel" && email.selected && !email.labels.includes(label)) {
          email.labels.push(label)
          ids.push(email.id)
        }
        if (action === "removeLabel" && email.selected && email.labels.includes(label)) {
          email.labels.splice(email.labels.indexOf(label), 1)
          ids.push(email.id)
        }
        return ids
      }, [])
      const data = {
        "messageIds": ids,
        "command": action,
        "label": label
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
        if (response.ok) {
          console.log(response)
        }
      })
      return prevState
    })
  }

  toggleCompose() {
    this.setState(prevState => {
      prevState.showCompose = !prevState.showCompose
      return prevState
    })
  }

  sendEmail(subject, body)  {
    let data = {
      subject: subject,
      body: body,
      read: false,
      starred: false,
      selected: false,
      labels: []
    }
    const settings = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(`${url}/messages`, settings)
    .then(response => {
      if (response.ok) {
        window.location.reload()
      }
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
          deleteMessage={this.deleteMessage.bind(this)}
          updateLabel={this.updateLabel.bind(this)}
          toggleCompose={this.toggleCompose.bind(this)} />

        {this.state.showCompose ?
          <Compose
            emails={this.state.emails}
            showCompose={this.state.showCompose}
            subject={this.state.subject}
            body={this.state.body}
            sendEmail={this.sendEmail.bind(this)}/>
          : null }

        <MessageList
          emails={this.state.emails}
          toggleStar={this.toggleStar.bind(this)}
          toggleSelect={this.toggleSelect.bind(this)} />
      </main>
    )
  }
}

export default App;
