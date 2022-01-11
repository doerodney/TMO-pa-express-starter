const express = require("express");
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
curl --request GET http://localhost:5000/health
*/

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});


/*
curl --data '{"author": "Douglas Adams", "title": "The Hitchhikers Guide to the Galaxy", "yearPublished": 1979}' --header "Content-Type: application/json" --request POST http://localhost:5000/api/books

curl --data '{"title": "Moby Dick", "author": "Herman Melville", "yearPublished": 1851}' --header  "Content-Type: application/json" --request POST http://localhost:5000/api/books

curl --data '{"author": "Philip K. Dick", "title": "Do Androids Dream of Electric Sheep?", "yearPublished": 1968}' --header  "Content-Type: application/json" --request POST http://localhost:5000/api/books
  
*/
app.post("/api/books", (req, res) => {
  obj = req.body
  obj['id'] = (books.length + 1)
  books.push(obj)
  //console.log(books)
  res.status(201).json(obj)
});


/* 
curl --request GET http://localhost:5000/api/books
*/
app.get("/api/books", (req, res) => {
  //console.log(books.sort(compareByTitle))
  res.setHeader("Content-Type", "application/json")
  const sortedBooks = books.sort(compareByTitle)
  const doc = {}
  doc['books'] = sortedBooks
  res.status(200).json(doc)
});
  

// curl --request DELETE http://localhost:5000/api/books  --verbose 
app.delete("/api/books", (req, res) => {
  
  // Remove all items from the books array:
  while (books.length) { 
    books.pop()
    //console.log(books)
  }

  res.status(204).send()

});

module.exports = app;
