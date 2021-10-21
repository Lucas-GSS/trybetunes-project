import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, favorites: [] };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async (_event, song) => {
    this.setState({ loading: true });
    await removeSong(song);
    this.getFavorites();
    this.setState({ loading: false });
  }

  getFavorites = async () => {
    const favoritesList = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favoritesList });
  }

  render() {
    const { favorites, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        { favorites.map((song) => (
          <MusicCard
            key={ song.trackId }
            favorites={ favorites }
            song={ song }
            handleChange={ this.handleChange }
          />
        )) }
      </div>
    );
  }
}

export default Favorites;
