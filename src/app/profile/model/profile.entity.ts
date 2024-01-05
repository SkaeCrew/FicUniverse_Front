export class Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  username: string;

  constructor(firstName: string, lastName:string, email: string, imageUrl: string, userName: string, id: number) {
    this.email = email;
    this.firstName = firstName;
    this.imageUrl = imageUrl;
    this.lastName = lastName;
    this.username = userName;
    this.id = id;
  }

  static createEmptyProfile(): Profile {
    return new Profile('','','','','',0);
  }
}
