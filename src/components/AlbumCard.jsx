import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const {
      album: { artistName, artworkUrl100, collectionName, collectionId } } = this.props;
    return (
      <section>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4>{ collectionName }</h4>
          <h6>{ artistName }</h6>
        </Link>
      </section>
    );
  }
}

AlbumCard.propTypes = PropTypes.shape({
  artworkUrl100: PropTypes.string,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
}).isRequired;

export default AlbumCard;
