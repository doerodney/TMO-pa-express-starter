const express = require("express");
const app = express();
const books = [
  {
    "title": "Moby Dick",
    "author": "Herman Melville",
    "yearPublished": 1851
  }
];

app.use(express.json());

app.use(express.urlencoded(
  { extended: true }
));

/* 
curl --request GET http://localhost:5000/health
*/

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});


/*
curl --data '{"author": "Douglas Adams", "title": "The Hitchhikers Guide to the Galaxy", "yearPublished": 1979}' --header "Content-Type: application/json" --request POST http://localhost:5000/api/books
*/
app.post("/api/books", (req, res) => {
  const id = books.length + 1
  req["id"] = id
  books.push(req.body)
  res.status(201).send()
});


/* 
curl --request GET http://localhost:5000/api/books
*/
app.get("/api/books", (req, res) => {
  res.status(200).send(books)
});
  /*
  HTTP Status: 200 OK
  
  Response Body:
  {
    "books": [
      {
        "id": ,
        "author": "Philip K. Dick",
        "title": "Do Androids Dream of Electric Sheep?",
        "yearPublished": 1968
      },
      {
        "id": 1,
        "author": "Douglas Adams",
        "title": "The Hitchhiker's Guide to the Galaxy",
        "yearPublished": 1979
      },
      {
        "id": 3,
        "author": "William Gibson",
        "title": "Neuromancer",
        "yearPublished": 1984
      }
    ]
*/


// curl --request DELETE http://localhost:5000/api/books
app.delete("/api/books", (req, res) => {
  /*
  HTTP Status: 204 No Content

  Response Body: None
  */
  res.status(204).send()
});

module.exports = app;
