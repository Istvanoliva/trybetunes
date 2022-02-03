import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      isValid: true,
    };
  }

  componentDidMount() {
    this.userInfos();
  }

  userInfos = async () => {
    const infos = await getUser();
    const { name, email, image, description } = infos;
    this.setState({
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.isButtonDisabled());
  }

  isButtonDisabled = () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const allTrue = userName && userEmail && userImage && userDescription;
    this.setState({ isValid: !allTrue });
  }

  submitButton = async () => {
    // event.preventDefault();
    const { userName, userEmail, userImage, userDescription } = this.state;
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });
    const { history } = this.props;
    console.log(history);
    history.push('/profile');
  }

  render() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
      isValid,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Editar Perfil</h1>
        <form>
          <label htmlFor="userName">
            <h3>Login</h3>
            <input
              type="text"
              data-testid="edit-input-name"
              value={ userName }
              onChange={ this.handleChange }
              name="userName"
              id="userName"
            />
          </label>

          <label htmlFor="userEmail">
            <h3>Email</h3>
            <input
              type="text"
              data-testid="edit-input-email"
              value={ userEmail }
              onChange={ this.handleChange }
              name="userEmail"
              id="userEmail"
            />
          </label>

          <label htmlFor="userImage">
            <h3>Imagem</h3>
            <input
              type="text"
              data-testid="edit-input-image"
              value={ userImage }
              onChange={ this.handleChange }
              name="userImage"
              id="userImage"
            />
          </label>

          <label htmlFor="userDescription">
            <h3>Descrição</h3>
            <input
              type="text"
              data-testid="edit-input-description"
              value={ userDescription }
              onChange={ this.handleChange }
              name="userDescription"
              id="userDescription"
            />
          </label>

          <button
            data-testid="edit-button-save"
            type="button"
            onClick={ this.submitButton }
            disabled={ isValid }
          >
            Editar perfil
          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
