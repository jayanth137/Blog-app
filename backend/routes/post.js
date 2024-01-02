const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// GET ALL POSTS /api/posts
router.get('/', async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: 'desc' });
  return res.status(200).json({
    success: true,
    message: 'GET ALL POSTS',
    data: { posts },
  });
});

// GET A POST /api/posts/:id

router.get('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  return res.status(200).json({
    success: true,
    message: 'GET A POST',
    data: { post: post || {} },
  });
});

//Post a post /api/posts
router.post('/', async (req, res, next) => {
  const { title, content, author, tags } = req.body;

  //create a new post
  const post = new Post({
    title,
    content,
    author,
    tags,
  });

  //save the post
  await post.save();
  return res.status(201).json({
    success: true,
    message: 'Created POST',
    data: { post },
  });
});

//Update a post /api/posts/:id
router.put('/:id', async (req, res, next) => {
  const { title, content, author, tags } = req.body;

  const post = await Post.findByIdAndUpdate(req.params.id, {
    title,
    content,
    author,
    tags,
  });

  return res.status(200).json({
    success: true,
    message: 'Updated POST',
    data: { post },
  });
});

//Delete a post /api/posts/:id
router.delete('/:id', async (req, res, next) => {
  const result = await Post.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: `Deleted ${result.deletedCount} POST`,
    data: {},
  });
});

module.exports = router;
