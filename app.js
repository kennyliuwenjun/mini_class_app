const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mini_class_app'
});


connection.query('SELECT * FROM teachers JOIN classes ON teachers.id = classes.teacher_id ORDER BY teacher_id;', function (error, results, fields) {
   if (error) throw error;
   console.log(results);
});
