import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      album: '',
      trackList: [],
    };
  }

  componentDidMount() {
    this.getAlbumInfos();
  }

  getAlbumInfos = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchMusicList = await getMusics(id);
    const musicList = fetchMusicList.filter((s) => s.kind === 'song');
    const getArtistId = fetchMusicList.find((artist) => artist.artistName);
    const { artistName, collectionName } = getArtistId;
    this.setState({ name: artistName, album: collectionName, trackList: musicList });
  }

  render() {
    const { name, album, trackList } = this.state;
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
