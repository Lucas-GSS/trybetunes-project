import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = { user: {}, loading: true };
  }

  componentDidMount() {
    this.getUserFromApi();
  }

  getUserFromApi = async () => {
    const apiResponse = await getUser();
    this.setState({ user: apiResponse.name, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component" className="header">
        <div className="header-elements">
          <span className="emoji">♪</span>
          <h1>TrybeTunes</h1>
          <h2 data-testid="header-user-name">
            Olá,
            { ' ' }
            { user }
          </h2>
        </div>
        <nav>
          <ul className="navigation-list">
            <li>
              <Link
                to="/search"
                className="itens"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="itens"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="itens"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
