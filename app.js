const express = require("express");
const app = express();
const books = [];


const isUniqueBook = (book) => {
  // Verify that the book has not already been added:
  let isUnique = true

  for (member of books) {
    if ((book['title']) == member['title']) {
      isUnique = false
      break
    }
  }

  return isUnique
}

const isValidBook = (obj) => {
  // Test if the object has the parts required to be a book:
  isValid = (('title' in obj) && ('author' in obj) && ('yearPublished' in obj)) ? true : false;
  // console.log(obj)
  // console.log(isValid)
  return isValid
}

const addBook = (obj) => {
  if (isValidBook(obj) && isUniqueBook(obj)) {
    obj['id'] = (books.length + 1)
    books.push(obj)
  }
}

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

curl --data '{"writer": "Douglas Adams", "name": "The Hitchhikers Guide to the Galaxy", "year": 1979}' --header "Content-Type: application/json" --request POST http://localhost:5000/api/books

curl --data '{"title": "Moby Dick", "author": "Herman Melville", "yearPublished": 1851}' --header  "Content-Type: application/json" --request POST http://localhost:5000/api/books

curl --data '{"author": "Philip K. Dick", "title": "Do Androids Dream of Electric Sheep?", "yearPublished": 1968}' --header  "Content-Type: application/json" --request POST http://localhost:5000/api/books
  
*/
app.post("/api/books", (req, res) => {
  addBook(req.body)
  //console.log(books)
  res.status(201).send()
});


/* 
curl --request GET http://localhost:5000/api/books
*/
app.get("/api/books", (req, res) => {
  //console.log(books)
  res.status(200).send(books.sort(compareByTitle))
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
  
  // Remove all items from the books array:
  while (books.length) { 
    books.pop()
    //console.log(books)
  }

  res.status(204).send()

});

module.exports = app;
