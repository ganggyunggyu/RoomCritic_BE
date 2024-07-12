import express from 'express';
import ReviewCreateDTO from '../DTO/review/ReviewCreateDTO.js';
import {
  ContentReviewsReadDTO,
  MyReviewsReadDTO,
  SelectedReviewDTO,
} from '../DTO/review/ReviewReadDTO.js';
import ReviewDeleteDTO from '../DTO/review/ReviewDeleteDTO.js';
import ReviewUpdateDTO from '../DTO/review/ReviewUpdateDTO.js';
import ReviewCreateController from '../controllers/review/ReviewCreateController.js';
import ReviewReadController from '../controllers/review/ReviewReadController.js';
import ReviewDeleteController from '../controllers/review/ReviewDeleteController.js';
import ReviewUpdateController from '../controllers/review/ReviewUpdateController.js';

const router = express.Router();
const reviewCreateController = new ReviewCreateController();
const reviewReadController = new ReviewReadController();
const reviewDeleteController = new ReviewDeleteController();
const reviewUpdateController = new ReviewUpdateController();

router.post('/create', async (req, res) => {
  try {
    const reviewCreateDTO = new ReviewCreateDTO(req.body.createData);
    const result = await reviewCreateController.createReview(reviewCreateDTO);
    return res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:contentType/:contentId', async (req, res) => {
  const ContentReadDTO = new ContentReviewsReadDTO(req.params);

  const result = await reviewReadController.contentRead(ContentReadDTO);

  return res.status(200).json({
    reviews: result.reviews,
    message: result.message,
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
  const reviewDeleteDTO = new ReviewDeleteDTO(req.body);
  const result = await reviewDeleteController.deleteReview(reviewDeleteDTO);
  return res.status(200).json({
    message: result.message,
  });
});
router.patch('/update', async (req, res) => {
  const reviewUpdateDTO = new ReviewUpdateDTO(req.body.updateData);
  const result = await reviewUpdateController.updateReview(reviewUpdateDTO);

  return res.status(200).json({
    message: result.message,
  });
});

export default router;
