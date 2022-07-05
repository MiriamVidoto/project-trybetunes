import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    arrayMusics: [],
    dataAlbum: '',
    dataArtist: '',
  }

  componentDidMount() {
    this.fetchMusics();
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

  render() {
    const { arrayMusics, dataAlbum, dataArtist } = this.state;
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
              .map(({ trackName, previewUrl }, i) => (
                <div key={ i }>
                  <MusicCard
                    trackName={ trackName }
                    previewUrl={ previewUrl }
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
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
