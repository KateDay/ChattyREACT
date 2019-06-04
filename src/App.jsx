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
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.currentUser = this.currentUser.bind(this);
  }

  currentUser(name){
    this.setState({currentUser: name})
  }
  // messages(){
  //   this.setState({messages:})
  // }

  render() {
    return (
      <div>
        <Nav/>
        <MessageList/>
        <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}


export default App;


