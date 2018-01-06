import React from 'react';

const Message = () => {
  return (
    <div className="row message unread">
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a>
          Here is some message text that has a bunch of stuff
        </a>
      </div>
    </div>
  )
}

export default Message;
