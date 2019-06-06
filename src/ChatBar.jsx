import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
    render() {
        return (
            <footer className="chatbar" >
                <input className="chatbar-username" 
                        placeholder="Your Name (Optional)" 
                        onKeyPress={this.props.usernameHandler}
                        defaultValue={this.props.currentUser.name} />
                <input className="chatbar-message" 
                        onKeyPress={this.props.messageHandler}
                        placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

ChatBar.propTypes = {
    currentUser: PropTypes.object,
    messageHandler: PropTypes.func,
    usernameHandler: PropTypes.func,
}

export default ChatBar;