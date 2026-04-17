const express = require("express");
const app = express();

app.use(express.json());

let posts = [];
let comments = [];

// Get all posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// Get specific post by ID
app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    res.json(post);
});

// Update post by ID
app.put("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...req.body };
        res.json(posts[postIndex]);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// Delete post by ID
app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.json({ message: "Post deleted" });
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

// Post a new post
app.post("/posts", (req, res) => {
    const post = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.status(201).json(post);
});


// Get all comments for a post by ID
app.get("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const postComments = comments.filter(c => c.postId === postId);
    res.json(postComments);
});

// Post a new comment to a post by ID
app.post("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const newComment = {
        id: comments.length + 1,
        postId: postId,
        content: req.body.content
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});