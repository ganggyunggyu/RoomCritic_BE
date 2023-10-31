/** @format */

import express from 'express';
import Post from '../Models/PostModel.js';
import User from '../Models/UserModel.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const reviewData = req.body.reviewData;
    const newPost = new Post({
      userId: reviewData.userId,
      userName: reviewData.userName,
      review: reviewData.review,
      addReview: reviewData.addReview,
      grade: reviewData.grade,
      contentPosterImg: reviewData.contentPosterImg,
      contentBackdropImg: reviewData.contentBackdropImg,
      contentName: reviewData.contentName,
      contentId: reviewData.contentId,
      contentType: reviewData.contentType,
    });
    await newPost.save();
    await User.updateOne({ _id: req.user.id }, { $inc: { posts: 1 } });
    return res.status(200).json({ message: '게시글 생성 완료' });
  } catch (err) {
    console.log(err);
  }
});

router.delete('/delete', async (req, res) => {
  console.log(req.body);
});

router.post('/review', async (req, res) => {
  console.log(req.body);
  const posts = await Post.find({
    contentId: req.body.contentId,
    contentType: req.body.contentType,
  });
  console.log(posts);

  return res.status(200).json({ reviews: posts });
});
router.get('/review', async (req, res) => {
  const posts = await Post.find({});

  return res.status(200).json({
    reviews: posts.sort((a, b) => {
      return b.createTime - a.createTime;
    }),
  });
});

router.get('/myreview/:userId', async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.find({ userId: userId });
  console.log('myPage Posts : ', posts);

  return res.status(200).json({
    reviews: posts.sort((a, b) => {
      return b.createTime - a.createTime;
    }),
  });
});

router.get('/review/:userId/:reviewId', async (req, res) => {
  console.log(req.params.reviewId);
  const reviewId = req.params.reviewId;
  const post = await Post.findById(reviewId);
  console.log(post);
  res.status(200).json({ review: post });
});

export default router;
