import mongoose from 'mongoose';

const tvSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content_type: { type: String, require: true },
  adult: { type: Boolean, required: false },
  backdrop_path: { type: String, required: false },
  genre_ids: [{ type: Number, required: false }],
  original_language: { type: String, required: false },
  original_title: { type: String, required: false },
  overview: { type: String, required: false },
  popularity: { type: Number, required: false },
  poster_path: { type: String, required: false },
  release_date: { type: Date, required: false },
  title: { type: String, required: true }, //name
  video: { type: Boolean, required: false },
  vote_average: { type: Number, required: false },
  vote_count: { type: Number, required: false },
});
const Tv = mongoose.model('Tv', tvSchema);

export default Tv;
