import {Component, OnInit} from '@angular/core';
import {ViewModuleDto} from "../../model/viewModuleDto";
import {ModuleService} from "../../service/module-service/module.service";
import {TaskWithSolutionDto} from "../../model/TaskWithSolutionDto";
import {TaskService} from "../../service/task-service/task.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  view: boolean = false;

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.upload();
    console.log("отработал")
  }

  upload() {
    this.progress = 0;
    // @ts-ignore
    this.currentFile = this.selectedFiles.item(0);
    this.taskService.upload(this.currentFile, this.task.taskDto.id, this.username).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.taskService.getFiles(this.task.taskDto.id, this.username);

        }
      });
  }

  public modules: ViewModuleDto[] = [];
  public module: ViewModuleDto;
  public tasks: TaskWithSolutionDto[] = [];
  public task: TaskWithSolutionDto;
  public title: string = '';
  public selectedModule: number;
  public selectedTask: number;
  public username: string;
  public text: string = '';

  public updateText: string = '';

  constructor(private moduleService: ModuleService, private taskService: TaskService, private tokenService: TokenService) {
  }

  ngOnInit(): void {

    this.username = <string>this.tokenService.getUsername();
    console.log(this.username);
    this.moduleService.getAllModules().subscribe(data => {
      this.modules = data;
    })
  }

  selectModule(event: any) {
    this.taskService.getTasksWithSolution(event.value).subscribe(data => {
      this.tasks = data;
      this.module = this.modules.filter(el => el.id === event.value)[0];
    });
    console.log("select: " + this.selectedModule);
    this.view = false;
    console.log(this.modules);
  }

  selectTask(event: any) {
    let sub = this.taskService.getTaskWithSolutionById(event.value).subscribe(data => {
      this.task = data;
      console.log(this.task);
      this.view = true;
      this.fileInfos = this.taskService.getFiles(this.task.taskDto.id, this.username);
      this.updateText = this.task.solutionDto.text;
      sub.unsubscribe();
    })
  }

  save() {
    this.taskService.save(this.task.taskDto.id, this.text, this.username).subscribe( data =>
      this.taskService.getTaskWithSolutionById(this.task.taskDto.id).subscribe(data => {
        this.task = data;
        this.view = true;
      })
    );
  }

  update() {
    this.taskService.update(this.task.taskDto.id, this.task.solutionDto.id, this.updateText, this.username).subscribe( data =>
      this.taskService.getTaskWithSolutionById(this.task.taskDto.id).subscribe(data => {
        this.task = data;
        this.view = true;
      })
    );
  }

  onTextUpdateChange(event: any) {
    this.updateText = event.target.value;
  }

  toDate(date: string) {
    console.log(date);
    return new Date(date).toLocaleString();
  }

  deleteFile(id: string) {
    this.taskService.deleteFile(id).subscribe(data => {
      this.fileInfos = this.taskService.getFiles(this.task.taskDto.id, this.username);
    })
  }

  onDescriptionChange(event: any) {
    this.text = event.target.value;
  }

  printFailStatus(): string {
    if (this.task.solutionDto.mark === 7) {
      return 'Необходимо доработать (незачет)' ;
    }
    else if (this.task.solutionDto.mark === 6) {
      return 'Необходимо доработать (зачет)' ;
    }
    else {
      return 'Необходимо доработать (Оценка: ' + this.task.solutionDto.mark + ' )';
    }
  }

  printSuccessStatus(): string {
    if (this.task.solutionDto.mark === 7) {
      return 'Согласовано (незачет)' ;
    }
    else if (this.task.solutionDto.mark === 6) {
      return 'Согласовано (зачет)' ;
    }
    else {
      return 'Согласовано (Оценка: ' + this.task.solutionDto.mark + ' )';
    }
  }

}
