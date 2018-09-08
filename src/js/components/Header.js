import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="navbar navbar-dark bg-navy">
        <Link className="navbar-brand" to="/">My Portfolio</Link>
      </div>
    );
  }
}

export default Header;