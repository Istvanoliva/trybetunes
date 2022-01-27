import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Albums from './Albums';
import Loading from './Loading';

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      disabled: true,
      searchedAlbums: [],
      loading: false,
      artist: '',
      resulte: '',
    };
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({ searchValue: target.value });
  }

  getAlbumsButton = async () => {
    this.setState({ loading: true });

    const { searchValue } = this.state;
    const result = await searchAlbumsAPI(searchValue);
    this.setState({
      searchedAlbums: [...result],
      searchValue: '',
      loading: false,
      artist: searchValue,
      resulte: result,
    });
  }

  render() {
    const { searchValue,
      disabled,
      searchedAlbums,
      loading,
      artist,
      resulte } = this.state;
    return (
      <div>
        { loading
          ? <Loading />

          : (
            <div>
              <form>
                <input
                  type="text"
                  placeholder="Nome do Artista"
                  data-testid="search-artist-input"
                  value={ searchValue }
                  onChange={ this.handleChange }
                />

                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ searchValue.length < 2 ? disabled : !disabled }
                  onClick={ this.getAlbumsButton }
                >
                  Pesquisar
                </button>
              </form>

              <h3>{ artist && `Resultado de álbuns de: ${artist}` }</h3>
            </div>
          )}
        <div>
          { !resulte.length ? (<h3>Nenhum álbum foi encontrado</h3>)
            : searchedAlbums.map((album) => (
              <div key={ album.collectionId }>
                <Albums
                  artistName={ album.artistName }
                  collectionName={ album.collectionName }
                  artworkUrl100={ album.artworkUrl100 }
                />

                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Album
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
