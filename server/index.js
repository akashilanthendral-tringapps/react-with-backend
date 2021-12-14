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
                conn.query("SELECT count(*) as c FROM emp", (err, result) => {
                    var count_ = JSON.parse(result[0].c + "");
                    if(count_ == 0){
                        conn.query("INSERT INTO emp values(?,?,?,?,?",[1, name, age, position, salary], (err, result) => {
                            if(err){
                                console.log("Error in inserting first value!");
                            }else{
                                
                            }
                        })
                    }
                })
                conn.query("select max(id) as id from EMP", (err, result) => {
                    if(err){
                        console.log("error querying to get max value of id!"+ err);
                    }else{
                        var id_ = JSON.parse(result[0].id + "") + 1;
                        console.log(result);
                        console.log("------");
                        // var id = result[0].'max(id)';
                        conn.query("INSERT INTO EMP (ID, NAME, AGE, POSITION, SALARY) VALUES(?,?,?,?,?)",[id_, name, age, position, salary], (err, result) => {
        if(err){
            console.log("ERROR MESSAGES ____________________________");
            console.log(err);
            return resp.send({"error ":"connecting"})
        }else{
            conn.query("select * from EMP", (err, result) => {
                if(err){
                    console.log("Error fetching data from DB")
                }else{
                    console.log(result);
                    return resp.status(200).send(result);
                }
            });
        }
    })
                        
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