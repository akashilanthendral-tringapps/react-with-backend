import "./App.css";
import {useState} from "react";
import Axios from 'axios';
function App() {
  //useState varibles are ones that can be sent to DB
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  // const summa = () =>{
  //   console.log("entered summa");
  // };
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      position : position,
      salary: salary
    }).then((response) => {
      //
       console.log("success" + response);
    })
  };
  const getEmployee = () =>{
    Axios.get("http://localhost:3001/get").then((response) => {
      //console.log(response);
      document.getElementById("demo").innerHTML = response;
    });
  }
  return (
    <div className="App">
      <div className="emp-details-entry">
        <h1>Employee Data</h1>
        <label htmlFor="e_name">Name: </label>
        <input
          type="text"
          name="e_name"
          placeholder="enter name"
          id="e_name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor="e_age">Age: </label>
        <input
          type="number"
          name="e_age"
          placeholder="enter age"
          id="e_age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label htmlFor="e_position">Position: </label>
        <input
          type="text"
          name="e_position"
          placeholder="enter position"
          id="e_position"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label htmlFor="e_salary">Salary</label>
        <input
          type="number"
          name="e_salary"
          id="e_salary"
          placeholder="enter salary"
          onChange={(event) => {
            setSalary(event.target.value);
          }}
        />

        <button id="input-btn" onClick={addEmployee}>
          Add Employee
        </button>
      </div>
      <div className="result">
        <button id="fetch" onClick={getEmployee}>
          fetch employees
        </button>
      </div>
    </div>
  );
}

export default App;
