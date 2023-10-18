import { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import styles from '../styles/HomePage.module.css';
import Schedule from '../components/Schedule';

function HomePage() {
  const [program, setProgram] = useState(0);
  const [member, setMember] = useState(true);
  // Set This back to false!!!!!!!!!!!!!!!!!!!!
  // Toggle this to skip ahead
  const [loggedIn, setLoggedIn] = useState(true);
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  return (
    <div className={styles.homepage}>
      <div className={styles.flexBox}>
        <h3>Health Care Management</h3>
        <h3>Home Page</h3>
      </div>
      {member && !loggedIn && (
        <h3 className={styles.loginMessage}>Please Log In</h3>
      )}
      {member && !loggedIn && (
        <Login setMember={setMember} setLoggedIn={setLoggedIn} />
      )}
      {!member && <h3 className={styles.loginMessage}>Please Signup</h3>}
      {!member && (
        <Signup
          setMember={setMember}
          signupFormData={signupFormData}
          setSignupFormData={setSignupFormData}
        />
      )}
      {program === 0 && (
        <h2 className={styles.welcomeMessage}>
          Welcome, {signupFormData.name.split(' ')[0]}
        </h2>
      )}
      <div onClick={() => setProgram(1)} className={styles.scheduleAccess}>
        Schedule
      </div>
      {program === 1 && <Schedule />}
    </div>
  );
}

export default HomePage;
