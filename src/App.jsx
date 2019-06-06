/* eslint-disable no-console */
import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.messageHandler = this. messageHandler.bind(this);
    this.usernameHandler = this. usernameHandler.bind(this);
  }

  messageHandler(event) {
    if (event.charCode==13) {
      const newMsg = {
      id: this.state.messages.length+1,
      username: this.state.currentUser.name,
      content: event.target.value
      }
      this.socket.send(JSON.stringify(newMsg))
      event.target.value = '';
    }
  }
  usernameHandler(event){
    if (event.charCode==13) {
      const user = {
        name: event.target.value
      }
      this.setState(
        {currentUser: user}
      )
      event.target.value = '';
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = () => {
      console.log('Chatty Server is now Connected')

      this.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(msg)
        const newMsges = [...this.state.messages, msg]
        this.setState( 
          {messages: newMsges}
          )
      }
    }

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
  
  render() {
    return (
      <div>
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} 
                usernameHandler={this.usernameHandler} 
                messageHandler={this.messageHandler}/>
      </div>
    );
  }
}


export default App;


