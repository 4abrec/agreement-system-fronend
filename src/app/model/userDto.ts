import {Role} from "./role";

export class UserDto {
  public id: number;
  public username: string;
  public fio: string;
  public university: string;
  public groupNumber: string;
  public address: string;
  public position: string;
  public phoneNumber: string;
  public photoUrl: string;
  public roles: Role[];


  constructor(id: number, username: string, fio: string, university: string, groupNumber: string, address: string, position: string, phoneNumber: string, photoUrl: string) {
    this.id = id;
    this.username = username;
    this.fio = fio;
    this.university = university;
    this.groupNumber = groupNumber;
    this.address = address;
    this.position = position;
    this.phoneNumber = phoneNumber;
    this.photoUrl = photoUrl;
  }
}
