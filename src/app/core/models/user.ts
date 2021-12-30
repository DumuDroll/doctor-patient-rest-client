export class User {

  id: number;
  uuid: string;
  username: string;
  password: string;
  roles: string[];
  status: string;



  constructor(id: number, uuid: string, username: string, password: string, roles: string[], status: string) {
    this.id = id;
    this.uuid = uuid;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.status = status;
  }
}
