import Review from '../../Models/ReviewModel.js';

export default class ReviewDeleteController {
  async deleteReview(reviewDTO) {
    // if (req.user._id === reviewDTO.userId) {
    //   await Review.deleteOne({ _id: reviewDTO._id });
    //   return { massage: '게시글 삭제가 완료되었습니다.' };
    // }
    // return { message: '본인이 아닙니다.' };
    const result = await Review.deleteOne({ _id: reviewDTO._id });

    return { result: result, message: '게시글 삭제가 완료되었습니다.' };
  }
}
