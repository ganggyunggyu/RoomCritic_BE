/** @format */

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userName: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  addReview: {
    type: String,
  },
  grade: {
    type: Number,
    required: true,
  },
  contentImg: {
    type: String,
    required: true,
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
  Like: {
    type: Number,
    default: 0,
  },
});
const Post = mongoose.model('Post', postSchema);

export default Post;
