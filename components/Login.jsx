import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/HomePage.module.css';

function Login({ setMember, setLoggedIn }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5880/api/v1/users/login', loginData);

      setLoginData({
        email: '',
        password: '',
      });
      setLoggedIn(true);
    } catch (error) {
      alert('Error submitting form!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginContainer}>
      <input
        onChange={handleChange}
        name='email'
        value={loginData.email}
        className={styles.inputSignup}
        type='text'
        placeholder='Enter email'
      />
      <input
        onChange={handleChange}
        name='password'
        value={loginData.password}
        className={styles.inputSignup}
        type='text'
        placeholder='Enter password'
      />

      <button type='submit' className={styles.btnSubmitSignUp}>
        Login
      </button>
      <p className={styles.signUpMessage}>
        Not a member? Signup{' '}
        <span onClick={() => setMember(false)} className={styles.here}>
          here!
        </span>
      </p>
    </form>
  );
}

export default Login;
