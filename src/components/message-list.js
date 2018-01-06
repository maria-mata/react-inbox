import React from 'react';
import Message from './message'

const MessageList = ({emails, toggleStar}) => {
  const messages = emails.map(email => {
    return (
      <Message
        key={email.id}
        email={email}
        toggleStar={toggleStar} />
    )
  })

  return (
    <div>
      { messages }
    </div>
  );
}

export default MessageList;
