export class User {

  id: number;
  name: string;
  password: string;
  roles: string[];
  status: string;

  constructor(id: number, name: string, password: string, roles: string[], status: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.roles = roles;
    this.status = status;
  }
}
