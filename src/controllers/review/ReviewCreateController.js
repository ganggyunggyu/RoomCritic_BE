import Review from '../../Models/ReviewModel.js';

export default class ReviewCreateController {
  async createReview(reviewDTO) {
    const newReview = new Review(reviewDTO);
    await newReview.save();

    return '게시글 생성 완료';
  }

  async updateReview(reviewDTO) {
    const newReview = new Review(reviewDTO);
    await newReview.save();

    return '게시글 수정 완료';
  }
  async deleteReview(reviewDTO) {
    const newReview = new Review(reviewDTO);
    await newReview.save();

    return '게시글 삭제 완료';
  }
}
