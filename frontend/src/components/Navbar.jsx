import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Login</Link>
      <Link to="/signup" style={styles.link}>Signup</Link>
      <Link to="/user" style={styles.link}>User</Link>
      <Link to="/admin" style={styles.link}>Admin</Link>
      <Link to="/owner" style={styles.link}>Store Owner</Link>
      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#007bff',
    padding: '10px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  button: {
    marginLeft: 'auto',
    padding: '6px 12px',
    background: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#007bff'
  }
};

export default Navbar;
