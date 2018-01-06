import React from 'react';
import Message from './message'

const MessageList = (props) => {
  const emails = props.emails.map(email => {
    return (
      <Message email={email} key={email.id}/>
    )
  })

  return (
    <div>
      { emails }
    </div>
  );
}

export default MessageList;
