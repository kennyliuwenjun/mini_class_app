INSERT INTO head_of_year_groups (email, first_name, last_name)
VALUES ('KennyLiu@gmail.com', 'Kenny', 'Liu'),
       ('DeanHarris@gmail.com', 'Dean', 'Harris');

INSERT INTO teachers (email, first_name, last_name)
VALUES ('VivienGuerra@gmail.com', 'Vivien', 'Guerra'),
       ('TaylahGalvan@gmail.com', 'Taylah', 'Galvan'),
       ('GriffHulme@gmail.com', 'Griff', 'Hulme'),
       ('EshaanBernard@gmail.com', 'Eshaan', 'Bernard'),
       ('PierreWhite@gmail.com', 'Pierre', 'White');

INSERT INTO students (email, first_name, last_name)
VALUES ('PolaMcdonnell@gmail.com', 'Pola', 'Mcdonnell'),
       ('ColtonChester@gmail.com', 'Colton', 'Chester'),
       ('JoanDoyle@gmail.com', 'Joan', 'Doyle'),
       ('YusefMcclain@gmail.com', 'Yusef', 'Mcclain'),
       ('NolaAbbott@gmail.com', 'Nola', 'Abbott'),
       ('KeithIrving@gmail.com', 'Keith', 'Irving'),
       ('ShaylaSavage@gmail.com', 'Shayla', 'Savage'),
       ('UsmanEstes@gmail.com', 'Usman', 'Estes'),
       ('JermaineGreen@gmail.com', 'Jermaine', 'Green');

INSERT INTO classes (class_code, teacher_id)
VALUES ('COMP1911', 1),
       ('PHYS1100', 1),
       ('CHEM1200', 2),
       ('MATH2100', 2),
       ('ENGL2210', 5);

INSERT INTO enrollments (student_id, class_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 5),
       (3, 2),
       (4, 4),
       (5, 4),
       (6, 4),
       (7, 4),
       (8, 5);
