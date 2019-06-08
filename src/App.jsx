/* eslint-disable no-console */
import React, { Component } from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      counter: 0
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.usernameHandler = this.usernameHandler.bind(this);
  }
  // handling the messages as inputted from the user
  messageHandler(event) {
    if (event.charCode == 13) {
      const newMsg = {
        type: 'postMessage',
        id: this.state.messages.length + 1,
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.socket.send(JSON.stringify(newMsg));
      event.target.value = '';
    }
  }
  // giving the ability to change the user's name
  usernameHandler(event) {
    
    if (event.charCode == 13) {
      const notify = `${this.state.currentUser.name} 
        changed their name to ${event.target.value}!`;
      const userMsg = {
        name: event.target.value,
        type: 'postNotification',
        content: notify
      };

      this.socket.send(JSON.stringify(userMsg));
      this.setState({ currentUser: userMsg });
    }
  }

  // this is going to happen at a certain time
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

    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  // What is going to be displayed
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
