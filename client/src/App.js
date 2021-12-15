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
  const [newSalary, setNewSalary] = useState(0);

  const deleteEmployee = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id;
      }))
    });
  }
  const addEmployee = () => {
  
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      position : position,
      salary: salary
    }).then((response) => {

      console.log(typeof(response.data.id_created));
      alert(`Employee with id ${response.data.id_created} added`);
    })
  };
  const getEmployee = () =>{
    Axios.get("http://localhost:3001/get").then((response) => {
      
       setEmployeeList(response.data);
       //displayData(response.data);
      //console.log(response.data);
      
    });
  }
  const updateSalary = (id) =>{
    Axios.put("http://localhost:3001/update", {salary: newSalary, id: id}).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id == id ? {id : val.id, name: val.name, age: val.age, position: val.position, salary: newSalary} : val;
      }))
    });
  }
  // function displayData(resObject){
  //   const f = document.getElementById("fetchedData");
  //   const resObjectList = resObject.map(emp => (
  //     "Name: " + emp.name + ", id: "+ emp.id));
  //   f.innerHTML = resObjectList;
  // };
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
                  <div className="fetched-employees">
                    <div>
                      <h3>ID: {emp.id}</h3>
                      <h3>Name: {emp.name}</h3>
                      <h3>Age: {emp.age}</h3>
                      <h3>Position: {emp.position}</h3>
                      <h3>Salary: {emp.salary}</h3>
                    </div>
                    <div>
                      {" "}
                      <input
                        type="text"
                        placeholder="salary"
                        onChange={(event) => {
                          setNewSalary(event.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          updateSalary(emp.id);
                        }}
                      >
                        update
                      </button>
                      <div>
                        <button onClick={()=>{
                          deleteEmployee(emp.id);
                        }}>Delete</button>
                      </div>
                    </div>
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
