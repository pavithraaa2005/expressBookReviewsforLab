const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Required for Task 11-13

const BASE_URL = "http://localhost:5000";

// Internal endpoint to provide books data for Axios calls
public_users.get('/books', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Task 10: Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books", error: error.message});
  }
});

// Task 11: Get book details based on ISBN using Promises with Axios
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  axios.get(`${BASE_URL}/books`)
    .then(response => {
      const booksData = response.data;
      if (booksData[isbn]) {
        res.status(200).json(booksData[isbn]);
      } else {
        res.status(404).json({message: "Book not found"});
      }
    })
    .catch(error => {
      res.status(500).json({message: "Error fetching book by ISBN", error: error.message});
    });
});
  
// Task 12: Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    const booksData = response.data;
    const filteredBooks = Object.values(booksData).filter(book => book.author === author);
    
    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({message: "No books found for this author"});
    }
  } catch (error) {
    return res.status(500).json({message: "Error fetching books by author"});
  }
});

// Task 13: Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    const booksData = response.data;
    const filteredBooks = Object.values(booksData).filter(book => book.title === title);

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({message: "No books found with this title"});
    }
  } catch (error) {
    return res.status(500).json({message: "Error fetching books by title"});
  }
});

module.exports.general = public_users;
