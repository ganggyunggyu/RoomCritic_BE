import express from 'express';
import Content from '../Models/ContentModel.js';
const router = express.Router();

router.get('/search', async (req, res) => {
  console.log(req.query.query);
  const search_value = req.query.search_value;

  const gate = [
    {
      $search: {
        index: 'content_title_index',
        text: { query: search_value, path: 'title' },
      },
    },
    // { $sort: { popularity: -1 } },
    { $limit: 10 }, //몇개 제한
    // { $skip: 10 }, // 앞에 10개 끊고 보여줘라
    // { $project: { _id: 0 } }, // 0 숨기기 1 안숨기기
  ];
  // const result = await Content.find({ $text: { $search: query } }); //index 사용방법
  // const result = await Content.find({ title: query }).explain('executionStats');
  try {
    const result = await Content.aggregate(gate);
    res.json({ contents: result, massage: '검색 콘텐츠 보내드림' });
  } catch (error) {
    console.error('검색 오류:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:content_type/:content_id', async (req, res) => {
  console.log(req.params);
  const { content_type, content_id } = req.params;

  const result = await Content.findOne({ id: content_id, content_type: content_type });
  console.log(result);

  res.status(200).json({ content: result, message: '단일 컨텐츠 보내드림' });
});

export default router;
