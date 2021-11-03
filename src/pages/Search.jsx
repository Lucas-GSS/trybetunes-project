import React, { Component } from 'react';
import AlbumList from '../components/AlbumList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      loading: false,
      albums: [],
      artist: '',
      response: false };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ searchText: value, artist: value });
  }

  handleClick = async () => {
    const { searchText } = this.state;
    this.setState({ loading: true });
    const albumsResponse = await searchAlbumsAPI(searchText);
    this.setState({
      searchText: '',
      loading: false,
      albums: albumsResponse,
      response: true });
  }

  render() {
    const { loading, albums, artist, response } = this.state;
    if (loading) return <Loading />;
    if (albums.length > 0 && response) {
      return (
        <div data-testid="page-search" className="album-container">
          <Header />
          <SearchForm
            handleChange={ this.handleChange }
            handleClick={ this.handleClick }
            artist={ artist }
          />
          <AlbumList albums={ albums } artist={ artist } />
        </div>
      );
    }
    if (albums.length === 0 && response) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <div data-testid="page-search">
        <Header />
        <SearchForm
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          artist={ artist }
        />
      </div>
    );
  }
}

export default Search;
