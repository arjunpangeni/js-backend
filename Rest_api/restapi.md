A **REST API** (Representational State Transfer Application Programming Interface) is a web service that follows a set of principles to enable communication between a client (such as a web browser or mobile app) and a server, typically using HTTP. REST is designed to be lightweight and stateless, making it ideal for web-based applications and services.

### Key Properties of REST API:

1. **Statelessness**: Each request from a client to a server must contain all the information needed to understand and process the request. The server does not store client state between requests.

2. **Client-Server Architecture**: The client and server are separated, allowing them to evolve independently. The client sends requests, and the server responds without any dependency on each other's state.

3. **Cacheable**: Responses from the server can be marked as cacheable or non-cacheable, allowing clients to store and reuse data to improve efficiency.

4. **Uniform Interface**: REST APIs use a standardized way of communicating between clients and servers, generally using HTTP methods like `GET`, `POST`, `PUT`, `DELETE`, etc.

5. **Layered System**: REST API calls go through various layers (security, load balancing, etc.) without the client being aware of these layers.

6. **Code on Demand (optional)**: Servers can return executable code to the client, extending client functionality (although this is not always implemented).

### Example: Building a REST API using Express.js

Here’s a simple example of a REST API that manages a collection of books.

#### 1. **Install Dependencies**

First, you need to initialize a Node.js project and install Express:

```bash
npm init -y
npm install express
```

#### 2. **Basic Express Server for a REST API**

In a file called `app.js`, create the following:

```javascript
const express = require('express');
const app = express();

// Use middleware to parse JSON
app.use(express.json());

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a single book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(204).send();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

#### 3. **Explanation of Endpoints**

- **GET** `/books`: Fetch all books.
- **GET** `/books/:id`: Fetch a single book by ID.
- **POST** `/books`: Create a new book (requires `title` and `author` in the request body).
- **PUT** `/books/:id`: Update an existing book by ID.
- **DELETE** `/books/:id`: Delete a book by ID.

#### 4. **Running the Server**

To start the server:

```bash
node app.js
```

You can now access the API by making HTTP requests to `http://localhost:3000/books`.

---

This example demonstrates the core concepts of REST, including stateless communication, CRUD operations, and the use of HTTP methods (GET, POST, PUT, DELETE) to manage resources (books).


## What is being stateless ?
It means the server does not retain any information(state) about the client between requests. Each client request to the server contain all the information needed to understand and process the request, as the server does't store any client specific information between different requests. 

### key points about statelessness.
- **Each request is independent.**
     The server treates every request from the client as an independent, standalone transcation. The server doesn't rely on any previous requests to process the current one.
     
- **No session information on the server**
   Unlike session-based system , where server side memory is used to track user activities across multiple requests, REST API requeire that every request carries all the data ( token , query) for the server to fulfill the request. 
   
- **client stores state.**
  If any state is required to be tracked (like user authentication or shopping cart data), it is managed on the client-side, either in the client’s local storage or included in each request to the server (e.g., via authentication tokens or cookies).
- **Scalability**
 Statelessness improves scalability because the server doesn’t need to allocate resources to manage session data or track client state, allowing it to handle more requests.





