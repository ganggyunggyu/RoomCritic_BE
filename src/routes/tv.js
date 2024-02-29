import express from 'express';

import Tv from '../Models/TvModel.js';
import Review from '../Models/ReviewModel.js';
const router = express.Router();

router.get('/latest', async (req, res) => {
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

router.get('/owner', async (_, res) => {
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

  return res.status(200).json({ tvs: tvs });
});

export default router;
