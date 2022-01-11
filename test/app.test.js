const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server/app");

const { expect } = chai;
chai.use(chaiHttp);

const testBooks = [
  {
    "author": "Douglas Adams", 
    "title": "The Hitchhikers Guide to the Galaxy", 
    "yearPublished": 1979
  },
  {
    "author": "Herman Melville",
    "title": "Moby Dick", 
    "yearPublished": 1851
  },
  {
    "author": "Philip K. Dick", 
    "title": "Do Androids Dream of Electric Sheep?", 
    "yearPublished": 1968
  }
]

// Test health endpoint:
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


// Test POST of a book:
describe("/POST first book", () => {
  it('it should post a book with no id but return a book with an id', (done) => {
    chai.request(app)
      .post('/api/books')
      .send(testBooks[0])
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


// Test POST of another book:
describe("/POST second book", () => {
  it('it should post a book with no id but return a book with an id', (done) => {
    chai.request(app)
      .post('/api/books')
      .send(testBooks[1])
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


// Test POST of yet another book:
describe("/POST third book", () => {
  it('it should post a book with no id but return a book with an id', (done) => {
    chai.request(app)
      .post('/api/books')
      .send(testBooks[2])
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


// Test GET of books:
describe("/GET multiple books", () => {
  it('it should return the books sorted by title', (done) => {
    chai.request(app)
      .get('/api/books')
      .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0]['title']).to.equal(testBooks[2]['title'])
          expect(res.body[1]['title']).to.equal(testBooks[1]['title'])
          expect(res.body[2]['title']).to.equal(testBooks[0]['title'])
        done()
      })
  })
});


// Test DELETE of books:
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

