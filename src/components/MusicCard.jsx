import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    this.checkFavoriteSong();
  }

  checkFavoriteSong = () => {
    const { song, favorite } = this.props;
    const { trackId } = song;
    const isFavorite = favorite.some((favoriteSong) => favoriteSong.trackId === trackId);
    if (isFavorite) this.setState({ favorite: true });
  }

  favoriteSongs = async () => {
    const { song } = this.props;
    const { favorite } = this.state;
    this.setState({ loading: true });
    await addSong(song);
    this.setState((prevState) => ({ favorite: !prevState.favorite, loading: false }));
    if (favorite) this.removeTrack();
  }

  removeTrack = async () => {
    const { song, teste } = this.props;
    const { isFavorite } = this.state;
    this.setState({ loading: true });
    const remove = await removeSong(song);
    if (isFavorite) remove();
    this.setState({ loading: false });
  }

  render() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { favorite, loading } = this.state;
    return (
      <div>
        <div>
          {
            loading ? <Loading />
              : (
                <div>
                  <p>{ trackName }</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
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
              checked={ favorite }
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
  teste: propTypes.func,
}.isRequired;
