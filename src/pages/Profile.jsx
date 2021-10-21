import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <section>
          <img src={ image } alt={ name } data-testid="profile-image" width="100px" />
          <h4>Nome:</h4>
          <span>{ name }</span>
          <h4>E-mail:</h4>
          <span>{ email }</span>
          <h4>Descrição</h4>
          <span>{ description }</span>
        </section>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
