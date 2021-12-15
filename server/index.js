const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const e = require('express');
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
            console.log("ERROR CONNECTING TO DATABASE"+err);
        }else{
            
            conn.query("SELECT COUNT(*) AS total FROM emp", (err, result) => {
                if(err){
                    console.log("ERROR: CANNOT FETCH COUNT(*) FROM DB"+ err);
                }else{
                    
                    const countt = JSON.parse(result[0].total + "");
                    //If there is no Data in DB
                    //Add the data as the first element
                    if(countt == 0){
                        conn.query("INSERT INTO emp values(?,?,?,?,?)",[1, name, age, position, salary], (err, result) => {
                            if(err){
                                console.log("while inserting employee details for ID = 1"+err);
                            }else{
                                resp.json({"id_created":1});
                            }
                        });
                    }//If employee data is already present
                    else{
                        conn.query("SELECT MAX(id) AS m FROM emp", (err,result) =>{
                            if(err){
                                console.log("ERROR FETCHING MAX(id) FROM emp: "+ err);
                            }else{
                                const maxx = JSON.parse(result[0].m + "") + 1;
                                conn.query("INSERT INTO emp VALUES(?,?,?,?,?)", [maxx, name, age, position, salary], (err, result) => {
                                    if(err){
                                        console.log("ERROR INSERTING DATA INTO emp:"+ err);
                                    }else{
                                        resp.json({"id_created":maxx});
                                    }
                                })
                            }
                            

                        })
                    }

                }
            })
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

app.delete('/delete/:id', (req,resp) => {
    const id_ = req.params.id;
    conn.connect((err) => {
        if(err){
            console.log("ERROR CONNECTING TO DB");
            resp.send("ERROR CONNECTING TO DB");
        }else{
            
            conn.query("DELETE FROM emp WHERE id = ?",id_, (err,result) => {
                if(err){
                    console.log(`ERROR deleting data with id = ${id_} TO DB`);
                    console.log(err);
                    resp.send(`ERROR deleting data with id = ${id_} TO DB`);
                }else{
                    console.log(result);
                    resp.send(result);
                }
            })
        }
    })
})

app.put('/update', (req,resp) => {
    const id_ = req.body.id;
    const salary_ = req.body.salary;
    conn.connect((err) =>{
        if(err){
            console.log("ERROR CONNECTING THE DB!");
            resp.send({"error":"connot connect to DB"});
        }else{
            conn.query("UPDATE emp SET salary = ? WHERE id = ?",[salary_, id_], (err, result) => {
                if(err){
                    console.log("ERROR UPDATING THE DB WITH SALARY");
                    resp.send({"Error":"cannot update"});
                }else{
                    resp.status(200).send("successfully updated");
                }
            });
        }
    })
})