export class UpdateStudentDto {

  public id: number
  public username: string;
  public fio: string;
  public university: string;
  public groupNumber: string;
  public phoneNumber: string;


  constructor(id: number, username: string, fio: string, university: string, groupNumber: string, phoneNumber: string) {
    this.id = id;
    this.username = username;
    this.fio = fio;
    this.university = university;
    this.groupNumber = groupNumber;
    this.phoneNumber = phoneNumber;
  }
}
