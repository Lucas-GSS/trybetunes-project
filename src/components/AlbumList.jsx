import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

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
        { albums.map((album) => (<AlbumCard
          key={ album.collectionId }
          album={ album }
        />)) }
      </div>
    );
  }
}

AlbumList.propTypes = PropTypes.shape({
  albums: PropTypes.arrayOf,
  artist: PropTypes.string,
}).isRequired;

export default AlbumList;
