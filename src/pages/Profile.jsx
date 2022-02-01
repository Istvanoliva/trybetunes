import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const infos = await getUser();
    const { name, email, image, description } = infos;
    this.setState({
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description });
  }

  render() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <h2>Perfil</h2>
        <img
          src={ userImage }
          alt="imagem"
          data-testid="profile-image"
        />
        <h3>{ userName }</h3>
        <h3>{ userEmail }</h3>
        <h4>{ userDescription }</h4>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>);
  }
}
