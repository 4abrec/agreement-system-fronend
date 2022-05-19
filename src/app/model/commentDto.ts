import {UserDto} from "./userDto";

export class CommentDto {
  public id: number;
  public text: string;
  public user: UserDto;
  public dateTime: string;
}
