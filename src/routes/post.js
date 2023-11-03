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
  try {
    // 중복되지 않은 고유한 영화 이름 목록 가져오기
    const uniqueMovieNames = await Post.aggregate([
      {
        $group: {
          _id: '$contentName',
          latestReview: { $first: '$$ROOT' },
        },
      },
    ]);
    console.log(uniqueMovieNames);
    // 최신 10개 리뷰 가져오기
    const latestReviews = uniqueMovieNames
      .sort((a, b) => b.latestReview.createTime - a.latestReview.createTime)
      .slice(0, 10)
      .map((item) => item.latestReview);

    return res.status(200).json({
      reviews: latestReviews,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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
