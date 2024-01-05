export class RegisterRequest {
  userName: String;
  email: String;
  password: String;
  role: String;
  constructor(user_name: String, email: String, password: String, role: String) {
    this.userName = user_name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
