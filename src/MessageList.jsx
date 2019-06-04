import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        return (
            <main className="messages">
                <Message/>
                <Message/>
                <div className="message system">
                    Anonymous1 changed their name to nomnom.
                </div>
                <Message/>
                <Message/>
            </main>
        );
    }
}
export default MessageList;