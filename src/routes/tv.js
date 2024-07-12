import express from 'express';

import Tv from '../Models/TvModel.js';
import Review from '../Models/ReviewModel.js';
const router = express.Router();

router.get('/latest', async (req, res) => {
  // const uniqueContentIds = await Review.aggregate([
  //   { $group: { _id: '$contentId' } },
  //   { $project: { _id: 0, contentId: '$_id' } }, // 선택적으로 _id 필드를 숨기고 contentId 필드를 만듭니다.
  // ]);

  // // 중복되지 않은 contentId 목록을 배열로 추출합니다.
  // const contentIds = uniqueContentIds.map((item) => item.contentId);

  // // 해당 contentId를 가진 리뷰만 가져오기 위해 쿼리합니다.
  // const reviews = await Review.find({ contentId: { $in: contentIds } }).sort({ createTime: -1 });

  const contentIds = await Review.distinct('contentId');

  const tvs = [];
  for (const content_id of contentIds) {
    const tv = await Tv.findOne({ _id: content_id });
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
