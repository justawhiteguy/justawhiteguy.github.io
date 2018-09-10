import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import quoteImg from '../../assets/quote-generator.png';
import weatherImg from '../../assets/weather-app.png';
import wikiImg from '../../assets/wiki-viewer.png';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <h2>About Me</h2>
          <div>
            Welcome to my site. My name is John and I'd like to consider myself a flourishing developer. I have experience in multiple
            languages including Java, Perl, and SQL. However, I've been spending my time developing my web development skills including
            picking up Javascript (React/Redux), CSS (SASS), and HTML. Take a look around here and see if there's anything that you find
            interesting.
          </div>
        </div>
        <div>
          <h2>Portfolio</h2>
          <div className="row portfolio-row">
            <div className="col-lg-6 col-portfolio">
              <Link to="/quotes" className="btn btn-light btn-portfolio">
                <h3>Random Quote Generator</h3>
                <img src={quoteImg} width={`100%`} />
              </Link>
            </div>
            <div className="col-lg-6 col-portfolio">
              <Link to="/weather" className="btn btn-light btn-portfolio">
                <h3>Simple Weather App</h3>
                <img src={weatherImg} width={`100%`} />
              </Link>
            </div>
          </div>
          <div className="row portfolio-row">
            <div className="col-lg-6 col-portfolio">
              <Link to="/wiki-viewer" className="btn btn-light btn-portfolio">
                <h3>Wikipedia Viewer</h3>
                <img src={wikiImg} width={`100%`} />
              </Link>
            </div>
            <div className="col-lg-6 col-portfolio"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
