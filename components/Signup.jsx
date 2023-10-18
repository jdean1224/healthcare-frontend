import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/HomePage.module.css';

function Signup({ setMember, signupFormData, setSignupFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5880/api/v1/users/signup',
        signupFormData
      );
      alert('Signup successful!');
      // setSignupFormData({
      //   name: '',
      //   email: '',
      //   password: '',
      //   passwordConfirm: '',
      // });
      setMember(true);
    } catch (error) {
      alert('There was an error during signup!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signupContainer}>
      <input
        onChange={handleChange}
        name='name'
        value={signupFormData.name}
        className={styles.inputSignup}
        type='text'
        placeholder='Enter name'
      />
      <input
        onChange={handleChange}
        name='email'
        value={signupFormData.email}
        className={styles.inputSignup}
        type='text'
        placeholder='Enter email'
      />
      <input
        onChange={handleChange}
        name='password'
        value={signupFormData.password}
        className={styles.inputSignup}
        type='text'
        placeholder='Enter password'
      />
      <input
        onChange={handleChange}
        name='passwordConfirm'
        value={signupFormData.passwordConfirm}
        className={styles.inputSignup}
        type='text'
        placeholder='Confirm password'
      />
      <button type='submit' className={styles.btnSubmitSignUp}>
        Submit
      </button>
    </form>
  );
}

export default Signup;
