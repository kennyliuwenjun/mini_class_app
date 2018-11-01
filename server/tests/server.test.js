const request = require("supertest");
const expect = require("expect");

const {app} = require('./../server');
const {peopleformat, oneClassFormat} = require('./../utils')

describe("app testing",() => {
  it("home page should work", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err,res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("should have at least 1 teacher with class", (done) => {
    request(app)
      .get("/all_teachers_classes")
      .expect(200)
      .end((err,res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("student page", (done) => {
    request(app)
      .get("/student_login")
      .expect(200)
      .end((err,res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

describe("utils testing",() => {
  it("grouping peopleformat", (done) => {
    const data = [
      {"id":1,"email":"VivienGuerra@gmail.com","first_name":"Vivien","last_name":"Guerra","class_code":"COMP1911"},
      {"id":1,"email":"VivienGuerra@gmail.com","first_name":"Vivien","last_name":"Guerra","class_code":"PHYS1100"},
      {"id":2,"email":"TaylahGalvan@gmail.com","first_name":"Taylah","last_name":"Galvan","class_code":"CHEM1200"},
      {"id":2,"email":"TaylahGalvan@gmail.com","first_name":"Taylah","last_name":"Galvan","class_code":"MATH2100"}
    ];
    expect(Object.keys(peopleformat(data)).length).toBe(2);
    done();
  });

  it("grouping classes", (done) => {
    const data = [
      {
        "first_name":"Vivien",
        "last_name":"Guerra",
        "class_code":"COMP1911"
      },
      {
        "first_name":"Vivien",
        "last_name":"Guerra",
        "class_code":"PHYS1100"
      }
    ];
    expect(oneClassFormat(data).classes.length).toBe(2);
    done();
  });
});
