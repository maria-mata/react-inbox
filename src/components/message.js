import React from 'react';

const Message = ({email}) => {
  return (
    <div className={"row message " + (email.read ? "read" : "unread") + (email.selected ? "selected" : "")}>
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
          { email.subject }
        </a>
      </div>
    </div>
  )
}

export default Message;
