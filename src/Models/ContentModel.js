import mongoose from 'mongoose';

const contentSchma = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content_type: { type: String, required: true, unique: true },
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String, required: true },
  genre_ids: [{ type: Number, required: true }],
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String, required: false },
  popularity: { type: Number, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: Date, required: true },
  title: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
});
const Content = mongoose.model('Content', contentSchma);

export default Content;
