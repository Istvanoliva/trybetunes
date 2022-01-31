import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      album: '',
      trackList: [],
      favorites: [],
    };
  }

  async componentDidMount() {
    // await this.cathFavoritesSongs();
    await this.getAlbumInfos();
  }

  // cathFavoritesSongs = async () => {
  //   const { trackId } = this.props;
  //   const isFavorite = await getFavoriteSongs();
  //   const favorite = isFavorite.some((song) => song.trackId === trackId);
  //   this.setState({ favorites: favorite });
  // }

  // cathFavoritesSongs = async () => {
  //   const isFavorite = await getFavoriteSongs();
  //   this.setState({ favorites: isFavorite });
  // }

  getAlbumInfos = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchMusicList = await getMusics(id);
    const musicList = fetchMusicList.filter((s) => s.kind === 'song');
    const getArtistId = fetchMusicList.find((artist) => artist.artistName);
    const { artistName, collectionName } = getArtistId;
    const isFavorite = await getFavoriteSongs();
    // this.setState({ favorites: isFavorite });
    this.setState({ name: artistName,
      album: collectionName,
      trackList: musicList,
      favorites: isFavorite });
  }

  render() {
    const { name, album, trackList, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ name }</h3>
        <h3 data-testid="album-name">{ album }</h3>

        {
          trackList.map((song) => (
            <li key={ song.trackId }>
              <MusicCard
                name={ song.trackName }
                audio={ song.previewUrl }
                trackId={ song.trackId }
                favorite={ favorites
                  .some((favoriteSong) => favoriteSong === song.trackId) }
              />
            </li>
          ))
        }

      </div>);
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
