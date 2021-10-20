import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = { name: '', loading: false, redirect: false };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minimumLength = 3;
    if (loading) return <Loading />;
    if (redirect) return <Redirect to="/search" />;
    return (
      <div className="login-container">
        <header className="login-header">
          <h1>TrybeTunes ♪</h1>
        </header>
        <div data-testid="page-login" className="login">
          <input
            className="input-login"
            data-testid="login-name-input"
            type="text"
            onChange={ this.handleChange }
          />

          <button
            className="button-login"
            data-testid="login-submit-button"
            disabled={ name.length < minimumLength }
            onClick={ this.handleClick }
            type="button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
