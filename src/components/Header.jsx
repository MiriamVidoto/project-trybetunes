import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    loading: true,
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      userName: user,
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header>
        <div>
          <h2 data-testid="header-user-name">{ userName.name }</h2>
        </div>
        <nav data-testid="header-component">
          <NavLink
            to="/search"
            activeClassName="selected"
            data-testid="link-to-search"
          >
            Pesquisa
          </NavLink>
          <NavLink
            to="/favorites"
            activeClassName="selected"
            data-testid="link-to-favorites"
          >
            Favoritas
          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="selected"
            data-testid="link-to-profile"
          >
            Perfil
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
