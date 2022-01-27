import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Albums extends Component {
  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
    } = this.props;
    return (
      <div>
        <p>{ artistName }</p>
        <p>{ collectionName }</p>
        <img src={ artworkUrl100 } alt={ artistName } />
      </div>
    );
  }
}

Albums.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;
