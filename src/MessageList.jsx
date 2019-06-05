import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
    render() {
        var messagesList = this.props.messages.map((msg, index) => 
        <Message username={msg.username} content={msg.content} key={msg.id}/>
        
        );
        return (
            <main className="messages">
                {messagesList}
                <div className="message system">
                    Anonymous1 changed their name to nomnom.
                </div>
            </main>
        );
    }
}
export default MessageList;