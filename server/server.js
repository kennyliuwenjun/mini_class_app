const express = require('express');
const mysql = require('mysql');
const bodyParser  = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mini_class_app'
});

app.get('/', (req, res) => {
	res.render('pages/index');
});

app.get('/about', (req, res) => {
	res.render('pages/about');
});

app.get('/all_teachers_classes', (req, res) => {
    connection.query('SELECT * FROM teachers JOIN classes ON teachers.id = classes.teacher_id ORDER BY teacher_id;', function (error, results, fields) {
       if (error) throw res.status(400).send(error);
       res.send(results);
    });
})


app.listen(8080, () => {
    console.log("Server running on 8080!");
});

module.exports = {app};
