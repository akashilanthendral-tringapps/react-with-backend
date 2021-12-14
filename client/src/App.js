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

  
  const addEmployee = () => {
  
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      position : position,
      salary: salary
    }).then((response) => {
       console.log(response.status)})
  };
  const getEmployee = () =>{
    Axios.get("http://localhost:3001/get").then((response) => {
      
       setEmployeeList(response.data);
       //displayData(response.data);
      //console.log(response.data);
      
    });
  }

  function displayData(resObject){
    const f = document.getElementById("fetchedData");
    const resObjectList = resObject.map(emp => (
      "Name: " + emp.NAME + ", id: "+ emp.ID));
    f.innerHTML = resObjectList;
  };
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
        <div className="fetched">
         
            {
              employeeList.map((emp, ind)=>{
                return (
                  <div className= "fetched-employees">
                    <h3>ID: {emp.ID}</h3>
                    <h3>Name: {emp.NAME}</h3>
                    <h3>Age: {emp.AGE}</h3>
                    <h3>Position: {emp.POSITION}</h3>
                    <h3>Salary: {emp.SALARY}</h3>
                  </div>
                );
              })
            }
         
        </div>


      </div>
    </div>
  );
 }

export default App;
