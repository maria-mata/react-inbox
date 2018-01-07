import React from 'react';

const Message = ({email, toggleStar, toggleSelect}) => {
  const labels = email.labels.map(label => {
    return (
      <span key={label} className="label label-warning">
        {label}
      </span>
    )
  })

  return (
    <div className={"row message" + (email.selected ? " selected " : " ") +
      (email.read ? "read" : "unread")}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={email.selected ? "checked" : ""}
              onClick={() => toggleSelect(email)}/>
          </div>
          <div className="col-xs-2">
            <i className={"star fa fa-" + (email.starred ? "star" : "star-o")}
              onClick={() => toggleStar(email)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        { labels }
        <a> { email.subject } </a>
      </div>
    </div>
  )
}

export default Message;
