const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server/app");

const { expect } = chai;
chai.use(chaiHttp);

describe("Base routes", () => {
  it("provides a response to the health endpoint", (done) => {
    chai
      .request(app)
      .get("/health")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/POST book", () => {
  it('it should post a book with no id but return a book with an id', (done) => {
    let book = {
      "title": "Eloquent JavaScript",
      "author": "Marijn Haverbeke",
      "yearPublished": 2019
    }
    chai.request(app)
      .post('/api/books')
      .send(book)
      .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('author');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('yearPublished');
        done()
      })
  })
});


describe("/DELETE books", () => {
  it('it should delete all books', (done) => {
    chai.request(app)
      .delete('/api/books')
      .end((err, res) => {
          expect(res).to.have.status(204);
        done()
      })
  })
});

/*
{"author": "Douglas Adams", "title": "The Hitchhikers Guide to the Galaxy", "yearPublished": 1979}
{"title": "Moby Dick", "author": "Herman Melville", "yearPublished": 1851}
{"author": "Philip K. Dick", "title": "Do Androids Dream of Electric Sheep?", "yearPublished": 1968}
*/