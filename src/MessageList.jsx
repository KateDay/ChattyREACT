import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		let messagesList = this.props.messages
			.filter(message => message.type === 'incomingMessage')
			.map(msg => (
				<li key={msg.id}>
					<Message username={msg.username} content={msg.content} />
				</li>
			));

		let notifications = this.props.messages
			.filter(message => {
				message.type === 'incomingNotification';
			})
			.map(msg => (
				<li className="message system" key={msg.id}>
					{msg.content}
				</li>
			));

		return (
			<main className="messages">
				{/* className="message"> */}

				<ul className="messageList">
					{notifications}
					{messagesList}
				</ul>
			</main>
		);
	}
}

MessageList.propTypes = {
	messages: PropTypes.array,
};

export default MessageList;
