const express = require("express");
const { readFile } = require("fs");
const { resolve } = require("path");

const app = express();
const books = [];

const compareByTitle = (a, b) => {
  if (a.title < b.title) {
    return -1
  }

  if (a.title > b.title) {
    return 1
  }

  return 0
}


app.use(express.json());

app.use(express.urlencoded(
  { extended: true }
));

/* 
curl --request GET http://localhost:4000/health

*/
app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});

/* 
curl --request GET http://localhost:4000/utc

*/
app.get("/utc", (req, res) => {
  const d = new Date();
  res.status(200).send(new Date().toISOString());
})

/* 
curl --request GET http://localhost:4000/version

*/
app.get("/version", (req, res) => {
  const version_path = resolve(__dirname, '../version.txt');

  readFile(version_path, 'utf-8', (err, content) => {
    if (err) {
      console.log(err);
      res.status(204).send();
    } else {
      res.status(200).send(content);
    }
  });
});

/*
curl --data '{"author": "Douglas Adams", "title": "The Hitchhikers Guide to the Galaxy", "yearPublished": 1979}' --header "Content-Type: application/json" --request POST http://localhost:4000/api/books

curl --data '{"title": "Moby Dick", "author": "Herman Melville", "yearPublished": 1851}' --header  "Content-Type: application/json" --request POST http://localhost:4000/api/books

curl --data '{"author": "Philip K. Dick", "title": "Do Androids Dream of Electric Sheep?", "yearPublished": 1968}' --header  "Content-Type: application/json" --request POST http://localhost:4000/api/books
  
*/
app.post("/api/books", (req, res) => {
  obj = req.body
  obj['id'] = (books.length + 1)
  books.push(obj)
  //console.log(books)
  res.status(201).json(obj)
});


/* 
curl --request GET http://localhost:4000/api/books
*/
app.get("/api/books", (req, res) => {
  //console.log(books.sort(compareByTitle))
  const sortedBooks = books.sort(compareByTitle)
  const doc = {}
  doc['books'] = sortedBooks
  res.status(200).json(doc)
});
  

// curl --request DELETE http://localhost:4000/api/books  --verbose 
app.delete("/api/books", (req, res) => {
  
  // Remove all items from the books array:
  while (books.length) { 
    books.pop()
    //console.log(books)
  }

  res.status(204).send()

});

module.exports = app;
