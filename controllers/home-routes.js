const express = require("express");
const router = express.Router();
const { Post, Comment, User } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const postData = await Post.findAll({ include: [User] });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts", { posts });
  } catch (err) {
    next(err);
  }
});

router.get("/post/:id", async (req, res, next) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    });

    if (!postData) {
      return res.status(404).end();
    }

    const post = postData.get({ plain: true });
    res.render("single-post", { post });
  } catch (err) {
    next(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

module.exports = router;
