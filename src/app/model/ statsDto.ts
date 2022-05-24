export class StatsDto {
  public title: string;
  public status: string;
  public sendDate: string;
  public deadLine: string;
  public mark: string
  public isOverdue: boolean;


  constructor(title: string, status: string, sendDate: string, deadLine: string, mark: string, isOverdue: boolean) {
    this.title = title;
    this.status = status;
    this.sendDate = sendDate;
    this.deadLine = deadLine;
    this.mark = mark;
    this.isOverdue = isOverdue;
  }
}
