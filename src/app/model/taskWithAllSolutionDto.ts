import {UserDto} from "./userDto";
import {TaskDto} from "./taskDto";
import {SolutionDto} from "./solutionDto";

export class TaskWithAllSolutionDto {
  userDto: UserDto;
  taskDto: TaskDto;
  solutionDto: SolutionDto;
}
