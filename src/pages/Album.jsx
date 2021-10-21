import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { songs: [], albumInfo: {} };
  }

  componentDidMount() {
    this.getAlbumMusics();
  }

  getAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const songsRequest = await getMusics(id);
    this.setState({ songs: songsRequest, albumInfo: songsRequest[0] });
  }

  render() {
    const {
      songs, albumInfo: { artistName, collectionName, artworkUrl100 } } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className="album-info">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4 data-testid="album-name">{ collectionName }</h4>
          <h5 data-testid="artist-name">{ artistName }</h5>
        </section>
        <section className="track-list">
          { songs.slice(1).map((song) => (
            <MusicCard key={ song.trackId } song={ song } />
          )) }
        </section>
      </div>
    );
  }
}

Album.propTypes = PropTypes.object.isRequired;

export default Album;
