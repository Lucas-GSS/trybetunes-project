import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/albumcard.css';

class AlbumCard extends Component {
  render() {
    const {
      album: { artistName, artworkUrl100, collectionName, collectionId } } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
        className="album-card"
      >
        <section>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4>{ collectionName }</h4>
          <h6>{ artistName }</h6>
        </section>
      </Link>
    );
  }
}

AlbumCard.propTypes = PropTypes.shape({
  artworkUrl100: PropTypes.string,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
}).isRequired;

export default AlbumCard;
