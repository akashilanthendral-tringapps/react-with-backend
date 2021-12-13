const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());

const conn = mysql2.createConnection({
    database:"E",
    host:"localhost",
    user: "root",
    password: "password"
})

// try{
    
// }catch(e){
//     console.log("Error connecting to DB---------------");
//     console.log(e);
// }


app.listen(port, () => {
    console.log(`Server started listening at port ${port}`);
});

app.post('/create', (req,resp) => {
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
    const salary = req.body.salary;

    
    conn.connect((err) => {
        if(err){
            console.log("Error connecting!!!");
            console.log(err);
        }else{
            try{
        conn.query("INSERT INTO EMP (NAME, AGE, POSITION, SALARY) VALUES(?,?,?,?)",[name, age, position, salary], (err, result) => {
        if(err){
            console.log("ERROR MESSAGES ____________________________");
            console.log(err);
            return resp.send({"error ":"connecting"})
        }else{
            return resp.json({"Values inserted!" : result});
        }
    })
    }catch(e){
        console.log(e);
    }
        }
    })
})

app.get('/get', (req,resp) => {
    conn.connect((err) =>{
        if(err){
            console.log("error: in get method!");
            console.log(err);
            return resp.send({"error" : err});
        }
        conn.query("select * from EMP", (err, result) =>{
            console.log(result);
            return resp.send(result);
        })
    })
})