export class LoginResponse {
  id: number;
  access_token: string;
  refresh_token: string;
  constructor() {
    this.id = 0;
    this.access_token = '';
    this.refresh_token = '';
  }
}
