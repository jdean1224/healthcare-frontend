import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/HomePage.module.css';

function Schedule() {
  // Array of employees
  const [employeesList, setEmployeesList] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [addEmployee, setAddEmployee] = useState(false);
  const [employee, setEmployee] = useState({
    name: '',
    age: '',
    gender: '',
    yearsExp: '',
    position: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let url = 'http://localhost:5880/api/v1/employees';
        if (sortOption) {
          url += `?sort=${sortOption}`;
        }
        const response = await axios.get(url);
        setEmployeesList(response.data.data.employees);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, [sortOption]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5880/api/v1/employees', employee);

      const response = await axios.get(
        'http://localhost:5880/api/v1/employees'
      );
      console.log(response.data.data.employees);
      setEmployeesList(response.data.data.employees);

      setEmployee({
        name: '',
        age: '',
        gender: '',
        yearsExp: '',
        position: '',
      });
    } catch (err) {
      alert('There was an error submitting the form!');
    }
  };

  return (
    <>
      {addEmployee && (
        <form onSubmit={handleSubmit} className={styles.addEmployeeContainer}>
          <p>Add Employee Info</p>
          <input
            onChange={handleChange}
            name='name'
            value={employee.name}
            className={styles.input}
            type='text'
            placeholder='Employee name'
          />
          <input
            onChange={handleChange}
            name='age'
            value={employee.age}
            className={styles.input}
            type='text'
            placeholder='Employee age'
          />
          <input
            onChange={handleChange}
            name='gender'
            value={employee.gender}
            className={styles.input}
            type='text'
            placeholder='Employee gender'
          />
          <input
            onChange={handleChange}
            name='yearsExp'
            value={employee.yearsExp}
            className={styles.input}
            type='text'
            placeholder='Employee years of exp'
          />
          <input
            onChange={handleChange}
            name='position'
            value={employee.position}
            className={styles.input}
            type='text'
            placeholder='Employee Job Position'
          />
          <button type='submit'>Submit</button>
        </form>
      )}

      {/* Schedule */}
      <div className={styles.scheduleMain}>
        <div className={styles.employeeControls}>
          <div
            onClick={() => setAddEmployee(true)}
            className={styles.addEmployeeBtn}
          >
            + Add Employee
          </div>
          {/* Dropdown to select sorting option */}
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value=''>Sort</option>
            <option value='name'>Name</option>
            <option value='age'>Age</option>
            <option value='gender'>Gender</option>

            <option value='YearsExp'>YearsExp</option>
            <option value='createdAt'>Most recent</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className={styles.scheduleContainer}>
          {employeesList.lebgth > 0 && (
            <h3 className={styles.addEmployeeMessage}>
              <span className={styles.employeeNum}>0</span> employees in system.
              Add employees.
            </h3>
          )}
          {employeesList.map((employee) => (
            <div className={styles.employeeRow} key={employee.id}>
              <p className={styles.employeeName}>{employee.name}</p>
              <p className={styles.employeeAge}>{employee.age}</p>
              <p className={styles.employeeGender}>{employee.gender}</p>
              <p className={styles.yearsExp}>{employee.yearsExp}</p>
              <p className={styles.position}>{employee.position}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Schedule;
