import mongoose from 'mongoose';

const GenreScoreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  review_count: { type: Number, require: true },
  genre_scores: [
    {
      genre_id: { type: Number, required: true },
      genre_name: { type: String, required: true },
      score: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
});

const GenreScore = mongoose.model('GenreScore', GenreScoreSchema);

export default GenreScore;
