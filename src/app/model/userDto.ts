export class UserDto {
  public id: number;
  public username: string;
  public fio: string;
  public university: string;
  public groupNumber: string;
  public address: string;
  public position: string;
  public phoneNumber: string;
  public roles: string[];


  constructor(id: number, username: string, fio: string, university: string, groupNumber: string, address: string, position: string, phoneNumber: string) {
    this.id = id;
    this.username = username;
    this.fio = fio;
    this.university = university;
    this.groupNumber = groupNumber;
    this.address = address;
    this.position = position;
    this.phoneNumber = phoneNumber;
  }
}
