import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let messagesList = this.props.messages
      .filter(message => message.type === 'incomingMessage')
      .map(msg => (
        <Message username={msg.username} content={msg.content} key={msg.id} />
      ));

    let notifications = this.props.messages
      .filter(message => {
        return message.type === 'incomingNotification';
      })
      .map((message, index) => <li key={index}>{message.content}</li>);

    return (
      <main className="messages">
        {/* className="message"> */}
        {messagesList}
        <ul className="message system">{notifications}</ul>
      </main>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array
};

export default MessageList;
