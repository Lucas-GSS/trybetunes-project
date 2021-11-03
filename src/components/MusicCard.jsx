import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/musiccard.css';

class MusicCard extends Component {
  render() {
    const {
      song, favorites, handleChange } = this.props;
    return (
      <div className="music-card">
        <strong>{ song.trackName }</strong>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ song.trackId }
        >
          <em>Favorita</em>
          <input
            data-testid={ `checkbox-music-${song.trackId}` }
            id={ song.trackId }
            type="checkbox"
            onChange={ (event) => handleChange(event, song) }
            checked={ favorites.some((track) => track.trackId === song.trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.object,
  favorites: PropTypes.object,
  handleChange: PropTypes.func,
}.isRequired;

export default MusicCard;
