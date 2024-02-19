export class LoginRequestDTO {
  constructor(requestData) {
    this.email = requestData.email;
    this.password = requestData.password;
  }
}
