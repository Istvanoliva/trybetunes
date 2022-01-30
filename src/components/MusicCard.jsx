import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { name, audio } = this.props;
    return (
      <div>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ audio } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: propTypes.string,
  audio: propTypes.string,
}.isRequired;
