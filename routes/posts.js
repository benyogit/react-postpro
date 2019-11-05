const express = require("express");
const router = express.Router();
const auth = require("./midlleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../model/Users");
const Post = require("../model/Posts");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  auth,

  [
    check("text", "Text is required")
      .not()
      .isEmpty(),
    check("title", "Title is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msf: "Bad input Fields"});
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();
      console.log(post);
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg: "Server Error"});
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json({ posts });
  } catch (err) {

    res.status(500).send("Server Error");
  }
});
/*
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("reach delete");

    const posts = await Post.deleteOne({_id: req.params.id, user:req.user.id});
    console.log(posts);

    if(posts.n>0){
      res.status(200).json({ posts });
    }else{
      res.status(400).json({ msg:"Bad Token or message already deleted" });
    }
  } catch (err) {

    res.status(400).json( {msg:"Server Error"});
  }
});*/
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({_id: req.params.id,user:req.user.id });

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    
    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.status(200).json(post.likes);
  } catch (err) {

    res.status(500).send("Server Error");
  }
});

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    
    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
