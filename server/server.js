const path = require('path');
const express = require('express');
const mysql = require('mysql');
const bodyParser  = require("body-parser");
const {peopleformat,oneClassFormat} = require("./utils");

const app = express();
// const clientPtah = path.join(__dirname,'../client');
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(express.static(clientPtah));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mini_class_app',
  multipleStatements: true
});

app.get('/', (req, res) => {
    res.render("pages/main_home");
})

//show teachers page
app.get('/head_of_year_group_login', (req, res) => {
    res.render("pages/head_of_year_group_home");
})

app.get('/student_login', (req, res) => {
    res.render("pages/student_home");
})

app.get('/teacher_login', (req, res) => {
    res.render("pages/teacher_home");
})

//create class page
app.get('/create_class', (req, res) => {
  connection.query('SELECT * from teachers;', function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     res.render("pages/create_class",{teachers:results});
  });
})

app.get('/create_teacher', (req, res) => {
   res.render("pages/create_teacher");
})

app.post('/class_add', (req, res) => {
  const q = `INSERT INTO classes(class_code, teacher_id) VALUES('${req.body.class_code}', ${req.body.teacher});`
  connection.query(q, function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     res.redirect("all_teachers_classes");
  });
})

app.post('/teacher_add', (req, res) => {
  const q = `INSERT INTO teachers(email, first_name, last_name) VALUES('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}');`
  connection.query(q, function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     res.redirect("all_teachers_classes");
  });
})

app.post('/enrollment_add', (req, res) => {
  const q = `INSERT INTO enrollments (student_id, class_id) VALUES(${req.body.student}, ${req.body.class});`
  connection.query(q, function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     res.redirect("all_students_classes");
  });
})

app.get('/all_teachers_classes', (req, res) => {
  connection.query('SELECT teachers.id, email, first_name, last_name, class_code FROM teachers LEFT JOIN classes ON teachers.id = classes.teacher_id;', function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     res.render("pages/teachers",{data:peopleformat(results)});
  });
})

app.get('/all_students_classes', (req, res) => {
    connection.query('SELECT students.id, email, first_name, last_name, class_code FROM students LEFT JOIN enrollments ON students.id = enrollments.student_id LEFT JOIN classes ON classes.id = enrollments.class_id;', function (error, results, fields) {
       if (error) throw res.status(400).send(error);
       res.render("pages/students",{data:peopleformat(results)});
    });
})

app.get('/enroll', (req, res) => {
  const q1 = 'SELECT * FROM students;';
  const q2 = 'SELECT * FROM classes;'
  connection.query(q1+q2, function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     res.render("pages/enroll",{students:results[0],classes:results[1]});
  });
})

app.post('/search_student', (req, res) => {
  connection.query(`SELECT first_name, last_name, class_code FROM students INNER JOIN enrollments ON students.id = enrollments.student_id INNER JOIN classes ON classes.id = enrollments.class_id WHERE email='${req.body.email}'`, function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     if (results.length>0){
       res.render("pages/student_home",{student:oneClassFormat(results)});
     } else {
       res.render("pages/student_home");
     }
  });
})

app.post('/search_teacher', (req, res) => {
  connection.query(`SELECT first_name, last_name, class_code FROM teachers LEFT JOIN classes ON teachers.id = classes.teacher_id WHERE email='${req.body.email}'`, function (error, results, fields) {
     if (error) throw res.status(400).send(error);
     if (results.length>0){
       // res.send(oneClassFormat(results));
       res.render("pages/teacher_home",{teacher:oneClassFormat(results)});
     } else {
       res.render("pages/teacher_home");
     }
  });
})


app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});

module.exports = {app};
