export default class ReviewCreateDTO {
  constructor(requestData) {
    this.userId = requestData.userId;
    this.userName = requestData.userName;
    this.lineReview = requestData.lineReview;
    this.longReview = requestData.longReview;
    this.grade = requestData.grade;
    this.contentPosterImg = requestData.contentPosterImg;
    this.contentBackdropImg = requestData.contentBackdropImg;
    this.contentName = requestData.contentName;
    this.contentId = requestData.contentId;
    this.contentType = requestData.contentType;
  }
}
