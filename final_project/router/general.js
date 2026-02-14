const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1: Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Returns the entire books object as a formatted JSON string
  res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn; // Retrieve the ISBN from the request URL
  
  if (books[isbn]) {
      // If the book exists, return it formatted neatly
      res.send(JSON.stringify(books[isbn], null, 4));
  } else {
      // If the book is not found, return a 404 error
      res.status(404).json({message: "Book not found"});
  }
 });
  
// Task 3: Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const bookKeys = Object.keys(books); // Get all the ISBN keys from the books object
  const booksByAuthor = []; // Create an array to hold matching books

  // Loop through all keys to find if the author matches
  bookKeys.forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });

  // Return the list of books found, or a message if none exist
  if (booksByAuthor.length > 0) {
    res.send(JSON.stringify(booksByAuthor, null, 4));
  } else {
    res.status(404).json({message: "Author not found"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
