import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    loading: false,
    arrayMusics: [],
    dataAlbum: '',
    dataArtist: '',
    favoritesMusics: [],
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavoritesMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);
    this.setState({
      arrayMusics: musics,
      dataAlbum: musics[0].collectionName,
      dataArtist: musics[0].artistName,
    });
  }

  fetchFavoritesMusics = () => {
    this.setState({
      loading: true,
    }, async () => this.setState({
      favoritesMusics: await getFavoriteSongs(),
      loading: false,
    }));
  }

  render() {
    const { loading, arrayMusics, dataAlbum, dataArtist, favoritesMusics } = this.state;

    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <h4 data-testid="album-name">{ dataAlbum }</h4>
            <p data-testid="artist-name">{ dataArtist }</p>
          </div>
          {
            arrayMusics
              .filter((musics, index) => index !== 0)
              .map(({ trackName, previewUrl, trackId }, i) => (
                <div key={ i }>
                  <MusicCard
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    arrayMusics={ arrayMusics }
                    favoritesMusics={ favoritesMusics }
                  />
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
