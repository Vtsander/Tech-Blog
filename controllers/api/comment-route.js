const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/Auth');
const { Comment } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try {
    const { body, session } = req;
    const newComment = await Comment.create({
      ...body,
      userId: session.userId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
