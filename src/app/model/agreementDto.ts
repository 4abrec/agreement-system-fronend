export class AgreementDto {
  public idSol: number;
  public username: string;
  public fio: string;
  public group: string;
  public status: string;
  public date: string;
  public mark: string
  public isOverdue: boolean;


  constructor(idSol: number,username: string, fio: string, group: string, status: string, date: string, mark: string, isOverdue: boolean) {
    this.idSol = idSol;
    this.username = username;
    this.fio = fio;
    this.group = group;
    this.status = status;
    this.date = date;
    this.mark = mark;
    this.isOverdue = isOverdue;
  }
}
