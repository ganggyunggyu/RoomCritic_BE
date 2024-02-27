import express from 'express';
import GenreScore from '../Models/GenreScoreModel.js';

const router = express.Router();

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const genreScore = await GenreScore.findOne({ user_id: user_id });
  console.log(genreScore);

  const { review_count, genre_scores } = genreScore;

  if (review_count === 0) {
    return res.status(200).json({
      reviewCount: 0,
      genreScore: false,
    });
  }

  const filterScore = genre_scores
    .filter((score) => {
      return score.score !== 0;
    })
    .sort((a, b) => {
      return b.score - a.score;
    });

  return res.status(200).json({ reviewCount: review_count, genreScore: filterScore });
});

export default router;
