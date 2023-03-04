import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    loading: false,
    buttonDisabled: true,
    loginName: '',
  }

  validateButton = (name) => {
    const minName = 3;
    return name.length < minName;
  }

  handleChange = ({ target }) => {
    this.setState({
      loginName: target.value,
      buttonDisabled: this.validateButton(target.value),
    });
  }

  handleButton = (event) => {
    event.preventDefault();

    const { loginName } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: loginName });
      history.push('/search');
    });
  }

  render() {
    const { loginName, buttonDisabled, loading } = this.state;

    if (loading) return <Loading />;
    return (
      <main data-testid="page-login">
        <div className="login">
          <h2>Login</h2>
          <label htmlFor="loginName">
            <input
              data-testid="login-name-input"
              type="text"
              name="loginName"
              placeholder="Nome do usuário"
              value={ loginName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ buttonDisabled }
            onClick={ this.handleButton }
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
