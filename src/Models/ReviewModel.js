import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  contentId: {
    type: mongoose.Types.ObjectId,
    required: true,
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
