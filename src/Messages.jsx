import { Component } from "react";
import React from "react";

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="message-list">
        {messages.map((m, i) => this.renderMessage(m, i))}
      </ul>
    );
  }

  renderMessage(data, index) {
    const { message } = data;
    const { currentMember } = this.props;
    const messageFromMe = message.clientId === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    let date = new Date(message.timestamp * 1000);
    return (
      <li key={index} className={className}>
        <div
          className="avatar"
          style={{
            backgroundColor: message.data.member.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt="avatar"
            src={message.data.member.user.avatar}
            width={20}
            height={20}
          />
        </div>
        <div className="message-content">
          <div className="username">{message.data.member.user.randomName}</div>
          <div className="text">
            {message.data.message}
            <br></br>
            <small style={{ fontSize: 10 }}>
              {date.toLocaleDateString('hr-HR')}
              <br></br>
              {date.getHours()}h {date.getMinutes()}min
            </small>
          </div>
        </div>
      </li>
    );
  }
}

export default Messages;
