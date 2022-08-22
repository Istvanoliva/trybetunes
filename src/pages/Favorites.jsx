import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritesCheckeds: [],
    };
  }

  componentDidMount() {
    this.fetchFavitesMusic();
  }

  fetchFavitesMusic = async () => {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({ favoritesCheckeds: favoritesSongs });
  }

  // removeCheckedSongs = async () => {
  //   const { favoritesCheckeds } = this.state;
  //   const { trackId } = this.props;
  //   const songId = favoritesCheckeds
  //     .find((song) => song.trackId === trackId);
  //   await removeSong(songId);
  //   const updateFavorites = favoritesCheckeds
  //     .filter((song) => song.trackId !== id);
  //   this.setState({ favoritesCheckeds: updateFavorites });
  // }

  render() {
    const { loading, favoritesCheckeds } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favoritos</h1>
        <div>
          {
            loading ? (<Loading />) : (
              favoritesCheckeds.map((song) => (
                <li key={ song.trackId }>
                  <MusicCard
                    favorite={ favoritesCheckeds }
                    song={ song }
                    teste={ this.removeCheckedSongs }
                  />
                </li>
              ))

            )
          }
        </div>
      </div>
    );
  }
}
