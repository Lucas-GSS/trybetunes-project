import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { songs: [], albumInfo: {}, favorites: [], loading: false };
  }

  componentDidMount() {
    this.getAlbumMusics();
    this.getFavorites();
  }

  handleChange = async ({ target }, song) => {
    const { favorites } = this.state;
    if (target.checked) {
      this.setState({ loading: true, favorites: [...favorites, song] });
      await addSong(song);
      this.setState({ loading: false });
    }
    if (!target.checked) {
      const newList = favorites.filter((track) => track.trackId !== song.trackId);
      this.setState({ loading: true, favorites: newList });
      await removeSong(song);
      this.setState({ loading: false });
    }
  }

  getAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const songsRequest = await getMusics(id);
    this.setState({ songs: songsRequest, albumInfo: songsRequest[0] });
  }

  getFavorites = async () => {
    const favoritesList = await getFavoriteSongs();
    this.setState({ favorites: favoritesList });
  }

  render() {
    const {
      songs, albumInfo: { artistName, collectionName, artworkUrl100 },
      loading,
      favorites,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading && <Loading /> }
        <section className="album-info">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4 data-testid="album-name">{ collectionName }</h4>
          <h5 data-testid="artist-name">{ artistName }</h5>
        </section>
        <section className="track-list">
          { songs.slice(1).map((song) => (
            <MusicCard
              key={ song.trackId }
              song={ song }
              favorites={ favorites }
              handleChange={ this.handleChange }
            />
          )) }
        </section>
      </div>
    );
  }
}

Album.propTypes = PropTypes.object.isRequired;

export default Album;
