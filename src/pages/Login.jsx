import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputLogin: '',
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
    const { inputLogin } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputLogin });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { inputLogin, redirect, loading } = this.state;
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
