import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="userCounter">{this.props.counter}</div>
            </nav>
        );
    }
}

Nav.propTypes = {
    counter: PropTypes.func
};
export default Nav;
