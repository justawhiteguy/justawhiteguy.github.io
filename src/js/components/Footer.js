import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer bg-dark text-center">
        Find me on social media
        <ul>
          <li><a href="https://www.linkedin.com/in/john-mackenzie-04517125" target="_blank"><i className="fab fa-linkedin"></i></a></li>
          <li><a href="https://github.com/justawhiteguy" target="_blank"><i className="fab fa-github"></i></a></li>
        </ul>
      </div>
    );
  }
}

export default Footer;