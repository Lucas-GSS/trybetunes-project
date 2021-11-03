import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { userInfo: {}, loading: false };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({ userInfo, loading: false });
  }

  render() {
    const { loading, userInfo: { name, email, description, image } } = this.state;
    return (
      <section>
        <Header />
        <section data-testid="page-profile" className="container">
          { loading && <Loading /> }
          <div className="profile">
            <img src={ image } alt={ name } data-testid="profile-image" />
            <h4>Nome:</h4>
            <p>{ name }</p>
            <h4>E-mail:</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        </section>
      </section>

    );
  }
}

export default Profile;
