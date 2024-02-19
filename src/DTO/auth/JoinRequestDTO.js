export class JoinRequestDTO {
  constructor(requestData) {
    this.email = requestData.email;
    this.password = requestData.password;
    this.displayName = requestData.displayName;
    this.phoneNumber = requestData.phoneNumber;
  }
}
