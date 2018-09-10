import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderLinks() {
    return (
      <div className="ml-auto">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#links" aria-controls="links" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="links">
          <div className="navbar-nav ml-auto">
            <Link to="/quotes" className="nav-item nav-link">Quote Generator</Link>
            <Link to="/weather" className="nav-item nav-link">Weather App</Link>
            <Link to="/wiki-viewer" className="nav-item nav-link">Wiki Viewer</Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-navy">
        <Link className="navbar-brand" to="/">My Portfolio</Link>
        {this.props.match.path !== this.props.location.pathname ? this.renderLinks() : null}
      </div>
    );
  }
}

export default withRouter(Header);