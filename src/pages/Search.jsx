import React, { Component } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <SearchForm />
      </div>);
  }
}
