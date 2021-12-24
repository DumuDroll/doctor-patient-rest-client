export class User {

  id: number;
  username: string;
  password: string;
  roles: string[];
  status: string;

  constructor(id: number, name: string, password: string, roles: string[], status: string) {
    this.id = id;
    this.username = name;
    this.password = password;
    this.roles = roles;
    this.status = status;
  }
}
