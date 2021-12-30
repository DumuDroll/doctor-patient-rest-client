export class Doctor {

  id: number;
  uuid: string;
  name: string;
  experience: string;

  constructor(id: number, uuid: string, name: string, experience: string) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.experience = experience;
  }

}
