import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const info = await getUser();
    this.setState({ userName: info.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Trybetunes</h1>
        <h3 data-testid="header-user-name">{ !userName ? <Loading /> : userName }</h3>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
