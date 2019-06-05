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
  }

  currentUser(name){
    this.setState({currentUser: name})
  }
  messages(message){
    this.setState({message})
  }

  render() {
    return (
      <div>
        <Nav/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}


export default App;


