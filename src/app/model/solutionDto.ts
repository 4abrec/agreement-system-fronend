import {FileDto} from "./fileDto";
import {CommentDto} from "./commentDto";

export class SolutionDto {
  public id: number;
  public text: string;
  public mark: number;
  public returnFlag: boolean;
  public dateTime: string;
  public status: string;
  public comments: CommentDto[];
  public files: FileDto[];
}
