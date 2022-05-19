import {AddTaskDto} from "./addTaskDto";
import {TaskDto} from "./taskDto";

export class UpdateModuleDto {
  public id: number;
  public title: string;
  public tasks: TaskDto[];
  public users: string[];


  constructor(id: number, title: string, tasks: TaskDto[], users: string[]) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.users = users;
  }
}
