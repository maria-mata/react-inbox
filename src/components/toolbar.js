import React from 'react';

const Toolbar = ({
  emails,
  bulkSelect,
  bulkCheckbox,
  emptyCheckbox,
  toggleRead,
  deleteMessage,
  updateLabel
}) => {
  const unreadCount = () => {
    return emails.reduce((number, email) => {
      if (!email.read) {
        number ++
      }
      return number
    }, 0)
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount()}</span>
          {"unread " + (unreadCount() === 1 ? "message" : "messages")}
        </p>

        <button className="btn btn-default" onClick={bulkSelect}>
          <i className={"fa " + (bulkCheckbox() ? "fa-check-square-o" :
            emptyCheckbox() ? "fa-square-o" : "fa-minus-square-o")}></i>
        </button>

        <button className="btn btn-default" onClick={() => toggleRead(true)}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={() => toggleRead(false)}>
          Mark As Unread
        </button>

        <select className="form-control label-select"
          onChange={event => updateLabel(event.target.value, "addLabel")}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select"
          onChange={event => updateLabel(event.target.value, "removeLabel")}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={() => deleteMessage()}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
