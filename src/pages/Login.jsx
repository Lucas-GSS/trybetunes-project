import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

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
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ this.handleChange }
        />

        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
          disabled={ name.length < minimumLength }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
