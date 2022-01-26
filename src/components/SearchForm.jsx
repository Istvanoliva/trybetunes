import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      disabled: true,
    };
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({ searchValue: target.value });
  }

  render() {
    const { searchValue, disabled } = this.state;
    return (
      <form>
        <input
          type="text"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          value={ searchValue }
          onChange={ this.handleChange }
        />

        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ searchValue.length < 2 ? disabled : !disabled }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}
