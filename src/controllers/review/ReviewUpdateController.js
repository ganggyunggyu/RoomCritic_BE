import Review from '../../Models/ReviewModel.js';

export default class ReviewUpdateController {
  async updateReview(reviewDTO) {
    const filter = { _id: reviewDTO.reviewId };
    const update = {
      $set: {
        lineReview: reviewDTO.lineReview,
        longReview: reviewDTO.longReview,
        grade: reviewDTO.grade,
      },
    };

    const result = await Review.updateOne(filter, update);
    return { result: result, message: '리뷰 수정이 되었습니다.' };
  }
}
