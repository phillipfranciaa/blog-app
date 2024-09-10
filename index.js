// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' folder
app.set('view engine', 'ejs'); // Set EJS as the template engine

// Temporary storage for blog posts
let posts = [];

// Home route - Displays all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// New post route - Display the form to create a new post
app.get('/new', (req, res) => {
  res.render('new-post');
});

// Create post route - Handles form submission to add a new post
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length, title, content }); // Assign a unique ID to each post
  res.redirect('/');
});

// Edit post route - Display the form to edit a post
app.get('/edit/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.render('edit-post', { post });
  } else {
    res.redirect('/');
  }
});

// Update post route - Handles form submission to update a post
app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

// Delete post route - Handles deleting a post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter((p) => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
