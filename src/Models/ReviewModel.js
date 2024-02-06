import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: {
    type: String,
    required: true,
  },
  lineReview: {
    type: String,
    required: true,
  },
  longReview: {
    type: String,
  },
  grade: {
    type: Number,
    required: true,
  },
  contentPosterImg: {
    type: String,
    required: true,
  },
  contentBackdropImg: {
    type: String,
  },
  contentName: {
    type: String,
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
    default: 0,
  },
});
const Review = mongoose.model('Review', reviewSchema);

export default Review;
