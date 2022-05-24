export class UpdateAdminDto {
  public username: string;
  public fio: string;
  public position: string;
  public address: string;
  public university: string;
  public phoneNumber: string;


  constructor(username: string, fio: string, position: string, address: string, university: string, phoneNumber: string) {
    this.username = username;
    this.fio = fio;
    this.position = position;
    this.address = address;
    this.university = university;
    this.phoneNumber = phoneNumber;
  }
}
