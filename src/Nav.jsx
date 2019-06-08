import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <div className="userCounter">
          How many users are here: {this.props.counter}
        </div>
      </nav>
    );
  }
}

//Setting propTypes
Nav.propTypes = {
  counter: PropTypes.number
};

export default Nav;
