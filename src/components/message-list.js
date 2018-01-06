import React from 'react';
import Message from './message'

const MessageList = ({emails, toggleStar, toggleSelect}) => {
  const messages = emails.map(email => {
    return (
      <Message
        key={email.id}
        email={email}
        toggleStar={toggleStar}
        toggleSelect={toggleSelect} />
    )
  })

  return (
    <div>
      { messages }
    </div>
  );
}

export default MessageList;
