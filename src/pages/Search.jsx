import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    search: '',
    buttonDisabled: true,
    albuns: [],
    result: '',
    loading: false,
  }

  validateButton = (data) => {
    const min = 2;
    return data.length < min;
  }

  validateResult = () => {
    const { albuns, search } = this.state;
    if (albuns.length === 0) {
      this.setState({
        result: 'Nenhum álbum foi encontrado',
        search: '',
      });
    } else {
      this.setState({
        result: `Resultado de álbuns de: ${search}`,
        search: '',
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      search: target.value,
      buttonDisabled: this.validateButton(target.value),
    });
  }

  handleClick = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const arrayAlbuns = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      albuns: arrayAlbuns,
    }, () => this.validateResult());
  }

  render() {
    const { search, buttonDisabled, albuns, result, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <div>
            <label htmlFor="searchArtist">
              <input
                type="text"
                name="searchArtist"
                data-testid="search-artist-input"
                value={ search }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </div>
        </form>
        <div>
          <h3>{ result }</h3>
          {
            albuns.map(({ collectionId, collectionName, artworkUrl100, artistName }) => (
              <div key={ collectionId } className="card-album">
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <h4>{artistName}</h4>
                  <p>{collectionName}</p>
                  <img src={ artworkUrl100 } alt={ collectionName } />
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Search;
