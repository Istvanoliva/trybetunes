import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favorite: props.favorite,
    };
  }

  // componentDidMount() {
  //   this.cathFavoritesSongs();
  // }

  favoriteSongs = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState((prevState) => ({ favorite: !prevState.favorite, loading: false }));
  }

  // cathFavoritesSongs = async () => {
  //   const { trackId } = this.props;
  //   const isFavorite = await getFavoriteSongs();
  //   const favorite = isFavorite.some((song) => song.trackId === trackId);
  //   this.setState({ favorites: favorite });
  // }

  render() {
    const { name, audio, trackId } = this.props;
    const { favorite } = this.state;
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
}.isRequired;
