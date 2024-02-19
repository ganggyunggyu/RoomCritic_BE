import Review from '../../Models/ReviewModel.js';

export default class ReviewCreateController {
  async createReview(reviewDTO) {
    const newReview = new Review(reviewDTO);
    await newReview.save();

    return { message: '게시글 생성 완료' };
  }
}
