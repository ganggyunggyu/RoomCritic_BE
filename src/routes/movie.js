import express from 'express';

import Tv from '../Models/TvModel.js';
import Review from '../Models/ReviewModel.js';
import Movie from '../Models/MovieModel.js';

const router = express.Router();

router.get('/latest', async (req, res) => {
  const content_ids = await Review.distinct('contentId');

  const movies = [];
  for (const id of content_ids) {
    const movie = await Movie.findOne({ _id: id });
    if (movie) {
      movies.push(movie);
    }
  }

  return res.status(200).json({ movies: movies });
});

router.get('/owner', async (_, res) => {
  const movieIds = [
    '65dbf74e13f52a0d8acd89a7',
    '65dbf75f13f52a0d8acd949e',
    '65dbf75313f52a0d8acd8cf4',
    '65dbf74e13f52a0d8acd8a02',
    '65dbf82713f52a0d8acde4bf',
    '65dc9438c4fbf075685f539b',
    '65dbf74d13f52a0d8acd895d',
  ];
  const movies = [];
  for (const id of movieIds) {
    const movie = await Movie.findOne({ _id: id });
    if (movie) movies.push(movie);
  }

  return res.status(200).json({ movies: movies });
});

router.get('/top-rated-movies', async (req, res) => {
  const topRatedMovieGate = [
    { $sort: { vote_count: -1 } },
    { $limit: 100 },
    { $sort: { vote_average: -1 } },
    { $limit: 20 },
  ];
  try {
    const topRatedMovies = await Movie.aggregate(topRatedMovieGate);

    res.status(200).json({ movies: topRatedMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
