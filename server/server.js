const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser  = require("body-parser");

const app = express();
// const clientPtah = path.join(__dirname,'../client');
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(bodyParser.json());
// app.use(express.static(clientPtah));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mini_class_app'
});

app.get('/', (req, res) => {
    res.render("pages/main_home");
})

app.get('/head_of_year_group_login', (req, res) => {
    res.render("pages/head_of_year_group_home");
})

app.get('/all_teachers_classes', (req, res) => {
    connection.query('SELECT teachers.id, email, first_name, last_name, class_code FROM teachers LEFT JOIN classes ON teachers.id = classes.teacher_id;', function (error, results, fields) {
       if (error) throw res.status(400).send(error);
       const data = {};
       for (row in results){
         let teacher = results[row];
         if (data[teacher.id]){
           data[teacher.id]['classes'].push(teacher.class_code);
         } else {
           data[teacher.id] = {
             classes : [teacher.class_code],
             email : teacher.email,
             first_name : teacher.first_name,
             last_name : teacher.last_name
           }
         }
       }
       // res.send(data)
       res.render("pages/teachers",{data});
    });
})


app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});

module.exports = {app};
