import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  favoriteSongs = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState({ loading: false });
  }

  render() {
    const { name, audio, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <div>
          {
            loading ? <Loading />
              : (
                <div>
                  <p>{ name }</p>
                  <audio data-testid="audio-component" src={ audio } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                </div>)
          }
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.favoriteSongs }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: propTypes.string,
  audio: propTypes.string,
}.isRequired;
