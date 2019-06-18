import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		let messagesList = this.props.messages
			.map(msg =>
				msg.type === 'incomingMessage' ? (
					<li key={msg.id}>
						<Message username={msg.username} content={msg.content} />
					</li>
				) : (
					<li className="message system" key={msg.id}>
						{msg.content}
					</li>
				));

		
		return (
			<main className="messages">
				<ul className="messageList">{messagesList}</ul>
			</main>
		);
	}
}

MessageList.propTypes = {
	messages: PropTypes.array,
};

export default MessageList;
