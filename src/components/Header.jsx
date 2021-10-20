import React, { Component } from 'react';
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
          <img src="https://t4.ftcdn.net/jpg/01/06/47/61/360_F_106476142_zMZkkTkhMeq0DIjV20oJI00e3QXLYIGN.jpg" alt="trybetunes-logo" width="120px" />

          <h1>TrybeTunes</h1>
          <h2 data-testid="header-user-name">
            Olá,
            { ' ' }
            { user }
          </h2>
        </div>
      </header>
    );
  }
}

export default Header;
