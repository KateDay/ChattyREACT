import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';


class MessageList extends Component {
    render() {
        var messagesList = this.props.messages.map((msg) => 
        <Message username={msg.username} content={msg.content} key={msg.id}/>
        );
        let notifications = this.props.messages
            .filter((message) => message.type === 'incomingNotifaction')
            .map((message) => message.content);


        return (
            <main className="messages">
                {messagesList}
                <div className="message system">
                    {notifications}
                </div>
            </main>
        );
    }
}

MessageList.propTypes = {
    messages: PropTypes.array
};

export default MessageList;