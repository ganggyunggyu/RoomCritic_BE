import express from 'express';
import Movie from '../Models/MovieModel.js';
import Tv from '../Models/TvModel.js';
import Review from '../Models/ReviewModel.js';
const router = express.Router();

//검색
router.get('/search', async (req, res) => {
  const search_value = req.query.search_value;
  const tvGate = [
    {
      $search: {
        index: 'tvs_title_index',
        text: { query: search_value, path: 'title' },
      },
    },
    // { $sort: { popularity: -1 } },
    { $limit: 20 }, //몇개 제한
    // { $skip: 10 }, // 앞에 10개 끊고 보여줘라
    // { $project: { _id: 0 } }, // 0 숨기기 1 안숨기기
  ];
  const movieGate = [
    {
      $search: {
        index: 'movies_title_index',
        text: { query: search_value, path: 'title' },
      },
    },
    // { $sort: { popularity: -1 } },
    { $limit: 20 }, //몇개 제한
    // { $skip: 10 }, // 앞에 10개 끊고 보여줘라
    // { $project: { _id: 0 } }, // 0 숨기기 1 안숨기기
  ];
  // const gate = [
  //   {
  //     $search: {
  //       index: 'content_title_index',
  //       text: { query: search_value, path: 'title' },
  //     },
  //   },
  //   // { $sort: { popularity: -1 } },
  //   { $limit: 10 }, //몇개 제한
  //   // { $skip: 10 }, // 앞에 10개 끊고 보여줘라
  //   // { $project: { _id: 0 } }, // 0 숨기기 1 안숨기기
  // ];
  try {
    const tvs = await Tv.aggregate(tvGate);
    const movies = await Movie.aggregate(movieGate);
    // const contents = await Content.aggregate(gate);
    const result = [...movies, ...tvs];

    return res.json({
      contents: result,
      massage: '검색 콘텐츠 보내드림',
    });
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/search/movie', async (req, res) => {
  const search_value = req.query.search_value;
  const movieGate = [
    {
      $search: {
        index: 'movies_title_index',
        text: { query: search_value, path: 'title' },
      },
    },
    { $limit: 20 },
  ];
  try {
    const movies = await Movie.aggregate(movieGate);
    return res.json({
      contents: movies,
      massage: '검색 콘텐츠 보내드림',
    });
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/search/tv', async (req, res) => {
  const search_value = req.query.search_value;
  const tvGate = [
    {
      $search: {
        index: 'tvs_title_index',
        text: { query: search_value, path: 'title' },
      },
    },
    { $limit: 20 },
  ];
  try {
    const tvs = await Tv.aggregate(tvGate);
    return res.json({
      contents: tvs,
      massage: '검색 콘텐츠 보내드림',
    });
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//콘텐츠 상세보기
router.get('/:content_type/:content_id', async (req, res) => {
  const { content_type, content_id } = req.params;
  const movie = await Movie.findOne({ _id: content_id });
  if (movie) {
    return res.status(200).json({ content: movie, message: '영화 컨텐츠 보내드림' });
  }
  const tv = await Tv.findOne({ _id: content_id });
  if (tv) {
    return res.status(200).json({ content: tv, message: '티비 컨텐츠 보내드림' });
  }
});

router.get('/latest/tv', async (req, res) => {
  const content_ids = await Review.distinct('contentId');

  const tvs = [];
  for (const id of content_ids) {
    const tv = await Tv.findOne({ _id: id });
    if (tv) {
      tvs.push(tv);
    }
  }
  return res.status(200).json({ tvs: tvs });
});

router.get('/latest/movie', async (req, res) => {
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

// router.get('/latest', async (req, res) => {
//   const content_ids = await Review.distinct('contentId');

//   const tvs = [];
//   for (const id of content_ids) {
//     const tv = await Tv.findOne({ _id: id });
//     if (tv) {
//       tvs.push(tv);
//     }
//   }
//   return res.status(200).json({ tvs: tvs });
// });

// router.get('/movie/latest', async (req, res) => {
//   const content_ids = await Review.distinct('contentId');

//   const movies = [];
//   for (const id of content_ids) {
//     const movie = await Movie.findOne({ _id: id });
//     if (movie) {
//       movies.push(movie);
//     }
//   }

//   return res.status(200).json({ movies: movies });
// });
router.get('/tv/owner', async (_, res) => {
  const tvIds = [
    '65dbf5b781cd24a164a54ca9',
    '65dbf55781cd24a164a51949',
    '65dbf57081cd24a164a5286c',
    '65dbf56481cd24a164a52118',
    '65dbf54a81cd24a164a511d0',
    '65dbf54781cd24a164a51035',
    '65dc9ba9679160d6ac82e4ef',
    '65dcfa7487f86005a7f80046',
    '65dbf55981cd24a164a51a65',
  ];
  const tvs = [];
  for (const id of tvIds) {
    const tv = await Tv.findOne({ _id: id });
    if (tv) tvs.push(tv);
  }
  console.log(tvs);
  return res.status(200).json({ tvs: tvs });
});

router.get('/movie/owner', async (_, res) => {
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
  console.log(movies);
  return res.status(200).json({ movies: movies });
});

export default router;
