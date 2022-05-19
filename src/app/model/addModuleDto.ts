import {AddTaskDto} from "./addTaskDto";

export class AddModuleDto {
  public title: string;
  public tasks: AddTaskDto[];
  public users: string[];


  constructor(title: string, tasks: AddTaskDto[], users: string[]) {
    this.title = title;
    this.tasks = tasks;
    this.users = users;
  }
}
