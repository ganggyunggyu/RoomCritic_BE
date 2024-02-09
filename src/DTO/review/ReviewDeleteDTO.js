export default class ReviewDeleteDTO {
  constructor(requestData) {
    this._id = requestData.reviewId;
    this.userId = requestData.userId;
  }
}
