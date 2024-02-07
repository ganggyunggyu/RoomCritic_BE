export class SelectedReviewDTO {
  constructor(requestData) {
    this.userId = requestData.userId;
    this.reviewId = requestData.reviewId;
  }
}
export class MyReviewsReadDTO {
  constructor(requestData) {
    this.userId = requestData.userId;
  }
}
export class ContentReviewsReadDTO {
  constructor(requestData) {
    this.contentId = requestData.contentId;
    this.contentType = requestData.contentType;
  }
}
