import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <div className="inputs">
          <label htmlFor="username">What should we call you?</label>
          <input
            id="username"
            type="text"
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            onKeyPress={this.props.usernameHandler}
            defaultValue={this.props.currentUser.name}
          />
        </div>
        <div className="inputs chat-text">
          <label htmlFor="message">What's on your mind?</label>
          <textarea
            rows="5"
            id="message"
            type="text"
            className="chatbar-message"
            onKeyPress={this.props.messageHandler}
            placeholder="Type a message and hit ENTER"
          />
        </div>
      </footer>
    );
  }
}

ChatBar.propTypes = {
  currentUser: PropTypes.object,
  messageHandler: PropTypes.func,
  usernameHandler: PropTypes.func
};

export default ChatBar;
