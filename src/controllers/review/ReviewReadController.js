import Review from '../../Models/ReviewModel.js';

export default class ReviewReadController {
  async latestRead() {
    const getLatestReviews = await Review.find().sort({ createTime: -1 }).limit(10);

    return { reviews: getLatestReviews, message: '최신 열개의 리뷰를 가져왔습니다.' };
  }
  async contentRead(reviewDTO) {
    const getContentReviews = await Review.find({
      contentId: reviewDTO.contentId,
      contentType: reviewDTO.contentType,
    }).sort({ createTime: -1 });
    return { reviews: getContentReviews, message: '콘텐츠 열개의 리뷰를 불러왔습니다.' };
  }
  async tvContentRead() {
    const getTvReviews = await Review.find({ contentType: 'tv' })
      .sort({ createTime: -1 })
      .limit(10);
    return { reviews: getTvReviews, message: 'TV 시리즈 리뷰 열개를 불러왔습니다.' };
  }
  async movieContentRead() {
    const getMovieReviews = await Review.find({ contentType: 'movie' })
      .sort({ createTime: -1 })
      .limit(10);

    return { reviews: getMovieReviews, message: 'Movie 시리즈 리뷰 열개를 불러왔습니다.' };
  }
  async myReviewsRead(reviewDTO) {
    const getMyrReviews = await Review.find({ userId: reviewDTO.userId }).sort({ createTime: -1 });
    return { reviews: getMyrReviews, message: '나의 리뷰를 최신순으로 불러왔습니다.' };
  }
  async selectedReviewRead(reviewDTO) {
    const getSelectedReview = await Review.findOne({
      userId: reviewDTO.userId,
      _id: reviewDTO.reviewId,
    });
    console.log('상세리뷰', getSelectedReview);
    return { review: getSelectedReview, message: '선택한 단일 리뷰를 불러왔습니다.' };
  }
}
