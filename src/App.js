import React, { Component } from 'react';
import Toolbar from './components/toolbar'
import MessageList from './components/message-list';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Toolbar />
        <MessageList />
      </div>
    );
  }
}

export default App;
