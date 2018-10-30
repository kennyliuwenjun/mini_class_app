const express = require('express');
const mysql = require('mysql');
// const bodyParser  = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mini_class_app'
});

app.get("/getTeachers", function(req, res){
    connection.query('SELECT * FROM teachers JOIN classes ON teachers.id = classes.teacher_id ORDER BY teacher_id;', function (error, results, fields) {
       if (error) throw error;
       console.log(results);
    });
})


app.listen(8080, function(){
    console.log("Server running on 8080!");
});
