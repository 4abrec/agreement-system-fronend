export class RegistrationStudentDto {
  public username: string;
  public password: string;
  public fio: string;
  public university: string;
  public groupNumber: string;
  public phoneNumber: string;
  public role: string


  constructor(username: string, password: string, fio: string, university: string, groupNumber: string, phoneNumber: string, role: string) {
    this.username = username;
    this.password = password;
    this.fio = fio;
    this.university = university;
    this.groupNumber = groupNumber;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
}
