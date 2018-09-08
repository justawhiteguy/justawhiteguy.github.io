import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Quotes extends Component {

  componentDidMount() {
    this.props.fetchQuote();
  }

  render() {
    const { quote } = this.props;
    return (
      <div className="container text-center">
        <h1 className="quote-title">Random Quote Generator</h1>
        <div className="card">
          <div className="card-body">
            <div className="blockquote">{quote.quote}</div>
            <div className="blockquote-footer">{quote.author}</div>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-success btn-quote" onClick={this.props.fetchQuote}>New Quote</button>
            <a href={`https://twitter.com/intent/tweet?text=${quote.quote + "\u2014" + quote.author}`} target="_blank" className="btn btn-twitter btn-quote">
              <i className="fab fa-twitter"></i> Tweet This Quote
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps( { quote } ) {
  return { quote };
}

export default connect(mapStateToProps, actions)(Quotes);