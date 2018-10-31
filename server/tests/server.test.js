const request = require("supertest");
const expect = require("expect");

const {app} = require('./../server')

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
});
