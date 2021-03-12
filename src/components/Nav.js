import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push('/');
  }

  return (
    <nav className='navbar'>
      <Link className='navbar__link' to='/'>Home</Link>
      {auth ? (
        <>
          <Link className='navbar__link' to='/products'>Products</Link>{' '}
          <button className='navbar__button' onClick={logout}>Log out</button>
        </>
      ) : (
        <Link className='navbar__link' to='/login'>Login</Link>
      )}
    </nav>
  );
}

export default Nav;