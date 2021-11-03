import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';
import '../styles/albumlist.css';

class AlbumList extends Component {
  render() {
    const { albums, artist } = this.props;
    return (
      <div>
        <p>
          Resultado de álbuns de:
          {' '}
          { artist }
        </p>
        <div className="album-list">
          { albums.map((album) => (<AlbumCard
            key={ album.collectionId }
            album={ album }
          />)) }
        </div>
      </div>
    );
  }
}

AlbumList.propTypes = PropTypes.shape({
  albums: PropTypes.arrayOf,
  artist: PropTypes.string,
}).isRequired;

export default AlbumList;
