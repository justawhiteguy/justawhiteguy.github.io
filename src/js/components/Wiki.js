import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Wiki extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch() {
    if (this.state.searchTerm) {
      return this.props.fetchWiki(this.state.searchTerm);
    }
  }

  renderResults() {
    const { wikis } = this.props;
    if (wikis.searchTerm) {
      if (wikis.data.length != 0) {
        return wikis.data.map(wiki => (
          <a href={wiki.url} target="_blank"  key={wiki.title} className="wiki-result">
            <div className="card">
              <div className="card-header"><h3>{wiki.title}</h3></div>
              <div className="card-body">{wiki.preview}</div>
            </div>
          </a>
        ))
      }
      return (
        <div className="search-error">Your search returned no results</div>
      );
    }
    return (
      <div></div>
    );
  }

  render() {
    return (
      <div className="container text-center">
        <h1>Search Wikipedia</h1>
        <div>
          <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Enter Search Term" />
        </div>
        <div>
          <button className="btn btn-success btn-search" onClick={this.handleSearch}>Search</button>
          <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" className="btn btn-primary btn-search">Random Article</a>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}

function mapStateToProps({ wikis }) {
  return { wikis };
}

export default connect(mapStateToProps, actions)(Wiki);