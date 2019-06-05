import React, {Component} from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.currentUser = this.currentUser.bind(this);
    this.messages = this.messages.bind(this);
    this.handleKeyPress = this. handleKeyPress.bind(this);
    this.addMsg = this.addMsg.bind(this);
  }

  currentUser(name){
    this.setState({currentUser: name})
  }
  messages(message){
    this.setState({message})
  }
  
  addMsg(message){
    const newMsg = {
      id: this.state.id+1,
      username: this.state.currentUser.name,
      content: message
    }

    const newMsges = [...this.state.messages, newMsg]
    return newMsges;
  }

  handleKeyPress(event) {
    if (event.charCode==13) {
        this.setState(
          {messages: this.addMsg(event.target.value)}
          )
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  

  render() {
    return (
      <div>
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} handleKeyPress={this.handleKeyPress}/>
      </div>
    );
  }
}


export default App;


