import {UserDto} from "./userDto";
import {TaskDto} from "./taskDto";

export class ViewModuleDto {
  id: number;
  title: string;
  tasks: TaskDto[];
  reviewers: UserDto[];
  performers: UserDto[];
}
