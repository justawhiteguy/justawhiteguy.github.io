import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../../css/styles.scss';

import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Quotes from './Quotes';
import Weather from './Weather';
import Wiki from './Wiki';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="wrapper">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/quotes" component={Quotes} />
              <Route path="/weather" component={Weather} />
              <Route path="/wiki-viewer" component={Wiki} />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
