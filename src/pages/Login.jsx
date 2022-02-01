import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputLogin: '',
      inputEmail: '',
      inputImage: '',
      inputDescription: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  submitButton = async () => {
    const { inputLogin, inputEmail, inputImage, inputDescription } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputLogin,
      email: inputEmail,
      image: inputImage,
      description: inputDescription });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { inputLogin,
      inputEmail,
      inputImage,
      inputDescription,
      redirect,
      loading } = this.state;
    const minLength = 3;

    if (redirect) return <Redirect to="/search" />;

    return (
      <div>
        {
          loading ? (<Loading />) : (
            <div data-testid="page-login">
              <form>
                <label htmlFor="inputLogin">
                  <h3>Login</h3>
                  <input
                    type="text"
                    data-testid="login-name-input"
                    value={ inputLogin }
                    onChange={ this.handleChange }
                    name="inputLogin"
                    id="inputLogin"
                  />
                </label>

                <label htmlFor="inputEmail">
                  <h3>Email</h3>
                  <input
                    type="text"
                    value={ inputEmail }
                    onChange={ this.handleChange }
                    name="inputEmail"
                    id="inputEmail"
                  />
                </label>

                <label htmlFor="inputImage">
                  <h3>Imagem</h3>
                  <input
                    type="text"
                    value={ inputImage }
                    onChange={ this.handleChange }
                    name="inputImage"
                    id="inputImage"
                  />
                </label>

                <label htmlFor="inputDescription">
                  <h3>Descrição</h3>
                  <input
                    type="text"
                    value={ inputDescription }
                    onChange={ this.handleChange }
                    name="inputDescription"
                    id="inputDescription"
                  />
                </label>

                <button
                  data-testid="login-submit-button"
                  type="submit"
                  disabled={ inputLogin.length < minLength }
                  onClick={ this.submitButton }
                >
                  Entrar
                </button>
              </form>
            </div>)
        }
      </div>
    );
  }
}

// Créditos : Requisito 02 feito com ajuda de Quezia Lima - Turma 17!
