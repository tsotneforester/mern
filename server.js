//🔰 imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//🔰 connect to MongoDB
mongoose
  .connect(`mongodb+srv://tsotneforester:cZLHqT8Lgo2OOH3D@cluster0.5iuh8.mongodb.net/test`)
  .then(() => console.log('DB connection successful! database - test '))
  .catch(err => {
    console.log(err.message);
  });

//🔰 connect to MongoDB
const app = express();

//🔰 Middleware
app.use(bodyParser.json()); //💡 HTTP is a text-based protocol

//🔰 Define a Post schema
const postSchema = new mongoose.Schema({
  heading: String,
  text: String,
});

//🔰 Create a Post model
const Post = mongoose.model('post', postSchema);

//🔰 Create a new post (POST request)
app.post('/posts', async (req, res) => {
  //   req.body = {
  //     heading: 'axali ambebi',
  //     text: 'dRes amerikis prezidentma sakuTari Svili Seiwyala',
  //   };

  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

//🔰 Get all posts (GET request)
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

//🔰 Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
