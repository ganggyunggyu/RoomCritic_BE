export default class ReviewUpdateDTO {
  constructor(requestData) {
    this.userId = requestData.userId;
    this.reviewId = requestData.reviewId;
    this.lineReview = requestData.lineReview;
    this.longReview = requestData.longReview;
    this.grade = requestData.grade;
  }
}
