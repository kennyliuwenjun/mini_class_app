ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
DROP DATABASE mini_class_app;
CREATE DATABASE mini_class_app;
use mini_class_app;

CREATE TABLE head_of_year_groups (
    email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teachers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE students (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE classes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_code VARCHAR(100),
    teacher_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(teacher_id) REFERENCES teachers(id)
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    class_id INT,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(class_id) REFERENCES classes(id)
);
