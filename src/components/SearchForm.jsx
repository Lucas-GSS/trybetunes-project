import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/searchform.css';

class SearchForm extends Component {
  render() {
    const { handleChange, handleClick, artist } = this.props;
    const minimumLength = 2;
    return (
      <div className="search-form">
        <input
          className="search-input"
          data-testid="search-artist-input"
          type="text"
          placeholder="Digite o nome do artista"
          onChange={ handleChange }
        />
        <button
          className="search-button"
          data-testid="search-artist-button"
          disabled={ artist.length < minimumLength }
          type="button"
          onClick={ handleClick }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

SearchForm.propTypes = PropTypes.shape({
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  searchText: PropTypes.string,
}).isRequired;

export default SearchForm;
