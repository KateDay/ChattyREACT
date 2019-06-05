import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-message" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

ChatBar.propTypes = {
    currentUser: PropTypes.object
};

export default ChatBar;