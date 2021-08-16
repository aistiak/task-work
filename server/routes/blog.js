const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authenticateJWT = require("../utils/auth");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const blogs = await Blog.find({ userId: userId });    
    res.send(blogs);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

router.post("/create", authenticateJWT, async (req, res) => {
  const { content, userId } = req.body;
  try {
    const blog = new Blog({
      content,
      userId,
    });
    const data = await blog.save();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

router.get("/detail/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) res.send(`no blog found`);
    res.send(blog);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

router.post("/comment",authenticateJWT ,async (req, res) => {
  const { comment, blogId, userId, userName } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) res.send("blog not found");
    blog.comments.push({ comment, userId, userName: userName });
    const data = await blog.save();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

router.post("/vote", authenticateJWT,async (req, res) => {
  const { type, userId, blogId } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) res.send("blog not found");
    const votes = blog.votes.filter((v) => v.userId == userId);
    if (votes.length) {
      const updatedVotes = blog.votes.map((vote) => {
        if (vote.userId == userId) vote.type = type;
        return vote;
      });
      blog.votes = updatedVotes;
    } else {
      // first vote
      blog.votes.push({
        type: type,
        userId: userId,
      });
    }
    const data = await blog.save();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

module.exports = router;
