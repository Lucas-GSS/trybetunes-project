import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
      update: false,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  // Consultei esse repositório para organizar a lógica de handleClick e habilitar/desabilitar o botão https://github.com/tryber/sd-014-b-project-trybetunes/pull/42/commits/400d839ae31ae10707eb617c1864cba073c44847

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, image, description });
    this.setState({ loading: false, update: true });
  }

  render() {
    const { loading, name, description, email, image, update } = this.state;
    const toggle = name && description && email && image;
    if (update) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              id="name-input"
              name="name"
              data-testid="edit-input-name"
              defaultValue={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input">
            E-mail:
            <input
              type="email"
              id="email-input"
              name="email"
              data-testid="edit-input-email"
              defaultValue={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <textarea
              id="description-input"
              name="description"
              data-testid="edit-input-description"
              defaultValue={ description }
              cols="30"
              rows="10"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image-input">
            Foto
            <input
              alt={ name }
              type="text"
              id="image-input"
              name="image"
              data-testid="edit-input-image"
              defaultValue={ image }
              onChange={ this.handleChange }
              placeholder="Endereço da imagem"
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
            onClick={ this.handleClick }
            disabled={ !toggle }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
