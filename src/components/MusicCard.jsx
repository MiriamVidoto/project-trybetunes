import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    loading: false,
  }

  handleChecked = ({ target }) => {
    const { name, checked } = target;
    this.setState({
      isChecked: checked,
      loading: true,
    }, async () => {
      const { arrayMusics } = this.props;
      const dataMusic = arrayMusics
        .find((music) => music.trackName === name);
      await addSong(dataMusic);
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { isChecked, loading } = this.state;

    if (loading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackName }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            name={ trackName }
            id={ trackName }
            checked={ isChecked }
            onChange={ this.handleChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  arrayMusics: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
