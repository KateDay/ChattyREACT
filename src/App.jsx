/* eslint-disable no-console */
import React, { Component } from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: { name: 'Bob' },
			messages: [],
			counter: 0,
		};
		this.messageHandler = this.messageHandler.bind(this);
		this.usernameHandler = this.usernameHandler.bind(this);
	}

	messageHandler(event) {
		if (event.charCode == 13) {
			const newMsg = {
				type: 'postMessage',
				id: this.state.messages.length + 1,
				username: this.state.currentUser.name,
				content: event.target.value,
			};
			if (event.target.value === '') {
				alert(
					'You can not send an empty message. Tell us what is on your mind!',
				);
			} else {
				this.socket.send(JSON.stringify(newMsg));
				event.target.value = null;
			}
		}
	}

	usernameHandler(event) {
		if (event.charCode == 13) {
			const notify = `${this.state.currentUser.name} 
        changed their name to ${event.target.value}!`;
			const userMsg = {
				name: event.target.value,
				type: 'postNotification',
				content: notify,
			};
			if (event.target.value === '') {
				alert('We want to know what to call you, This field can not be empty');
			} else {
				this.socket.send(JSON.stringify(userMsg));
				this.setState({ currentUser: userMsg });
			}
		}
	}

	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:3001');
		this.socket.onopen = () => {
			console.log('Chatty Server is now Connected');

			this.socket.onmessage = event => {
				const post = JSON.parse(event.data);

				if (post.type === 'incomingMessage') {
					const newMsges = [...this.state.messages, post];
					this.setState({ messages: newMsges });
				} else if (post.type === 'incomingNotification') {
					const msgNotify = [...this.state.messages, post];
					this.setState({ messages: msgNotify });
				} else if (post.type === 'counter') {
					console.log(post.count);
					this.setState({ counter: post.count });
				}
			};
		};
	}

	render() {
		return (
			<div>
				<Nav counter={this.state.counter} />
				<MessageList messages={this.state.messages} />
				<ChatBar
					currentUser={this.state.currentUser}
					usernameHandler={this.usernameHandler}
					messageHandler={this.messageHandler}
				/>
			</div>
		);
	}
}

export default App;
