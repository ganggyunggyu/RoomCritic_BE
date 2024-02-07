import express from 'express';
import ReviewCreateDTO from '../DTO/review/ReviewCreateDTO.js';
import {
  ContentReviewsReadDTO,
  MyReviewsReadDTO,
  SelectedReviewDTO,
} from '../DTO/review/ReviewReadDTO.js';
import ReviewCreateController from '../controllers/review/ReviewCreateController.js';
import ReviewReadController from '../controllers/review/ReviewReadController.js';

const router = express.Router();
const reviewCreateController = new ReviewCreateController();
const reviewReadController = new ReviewReadController();

router.post('/create', async (req, res) => {
  console.log(req.body);
  try {
    const reviewCreateDTO = new ReviewCreateDTO(req.body.reviewData);
    const result = await reviewCreateController.createReview(reviewCreateDTO);
    return res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:contentId/:contentType', async (req, res) => {
  const ContentReadDTO = new ContentReviewsReadDTO(req.params);
  const result = await reviewReadController.contentRead(ContentReadDTO);
  return res.status(200).json({
    reviews: result.reviews,
  });
});
router.get('/latest', async (_, res) => {
  try {
    const result = await reviewReadController.latestRead();
    return res.status(200).json({
      reviews: result.reviews,
      message: result.message,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get('/tv', async (_, res) => {
  const result = await reviewReadController.tvContentRead();
  return res.status(200).json({ tvContentReviews: result.reviews });
});
router.get('/movie', async (_, res) => {
  const result = await reviewReadController.movieContentRead();
  return res.status(200).json({ movieContentReviews: result.reviews });
});
router.get('/:userId', async (req, res) => {
  const myReviewsReadDTO = new MyReviewsReadDTO(req.params);
  const result = await reviewReadController.myReviewsRead(myReviewsReadDTO);
  return res.status(200).json({
    reviews: result.reviews,
    message: result.message,
  });
});
router.get('/detail/:userId/:reviewId', async (req, res) => {
  const selectedReviewDTO = new SelectedReviewDTO(req.params);
  const result = await reviewReadController.selectedReviewRead(selectedReviewDTO);
  return res.status(200).json({
    review: result.review,
    message: result.message,
  });
});

router.delete('/delete', async (req, res) => {
  const reviewDeleteDTO = new reviewDeleteDTO(req.body);
  const result = await reviewCreateController.deletePost(reviewDeleteDTO);

  return res.status(200).json({
    message: result.message,
  });
});
router.patch('/update', async (req, res) => {
  const reviewUpdateDTO = new reviewUpdateDTO(req.body);
  const result = await reviewCreateController.updatePost(reviewUpdateDTO);

  return res.status(200).json({
    message: result.message,
  });
});

export default router;
