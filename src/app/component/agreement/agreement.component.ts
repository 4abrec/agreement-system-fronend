import {Component, OnInit, ViewChild} from '@angular/core';
import {ViewModuleDto} from "../../model/viewModuleDto";
import {TaskWithSolutionDto} from "../../model/TaskWithSolutionDto";
import {ModuleService} from "../../service/module-service/module.service";
import {TaskService} from "../../service/task-service/task.service";
import {TokenService} from "../../service/token.service";
import {UserDto} from "../../model/userDto";
import {UserService} from "../../service/user-service/user.service";
import {TaskWithAllSolutionDto} from "../../model/taskWithAllSolutionDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AgreementDto} from "../../model/agreementDto";
import {MatDialog} from "@angular/material/dialog";
import {RegistrationDialogComponent} from "../dialog/registration-dialog/registration-dialog.component";
import {AgreementDialogComponent} from "../dialog/agreement-dialog/agreement-dialog.component";
import {ViewProfileDialogComponent} from "../view-profile-dialog/view-profile-dialog.component";

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.less']
})
export class AgreementComponent implements OnInit {

  displayedColumns: string[] = ['username', 'fio', 'group', 'status', 'date', 'mark', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public agreementDto: AgreementDto[] = [];
  public taskWithAllSolution: TaskWithAllSolutionDto[];
  public modules: ViewModuleDto[] = [];
  public module: ViewModuleDto;
  public tasks: TaskWithSolutionDto[] = [];
  public task: TaskWithSolutionDto;
  public title: string = '';
  public selectedModule: number;
  public selectedTask: number;
  public username: string;
  public text: string = '';
  view: boolean = false;
  public students: UserDto[];
  public studentUsernames: string[];
  public agreementData: TaskWithAllSolutionDto;

  constructor(private moduleService: ModuleService, private userService: UserService,
              private taskService: TaskService, private tokenService: TokenService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.moduleService.getAllModules().subscribe(data => {
      this.modules = data;
    })
  };


  getStudents() {
    this.userService.getStudentsByModule(this.module.id).subscribe(data => {
      this.students = data;
      this.studentUsernames = this.students.map(user => user.username);
      console.log(this.students);
      console.log(this.studentUsernames);
    })
  }

  selectModule(event: any) {
    this.taskService.getTasksWithSolution(event.value).subscribe(data => {
      this.tasks = data;
      this.module = this.modules.filter(el => el.id === event.value)[0];
      this.getStudents();
    });
    console.log("select: " + this.selectedModule);
    this.view = false;
    console.log(this.modules);

  }

  selectTask(event: any) {
    let sub = this.taskService.getTaskWithSolutionById(event.value).subscribe(data => {
      this.task = data;
      this.view = true;
      this.getTaskWithAllSolution();
      sub.unsubscribe();
    })
  }

  getTaskWithAllSolution() {
    let sub = this.taskService.getTaskWithAllSolutions(this.task.taskDto.id).subscribe(data => {
      this.agreementDto = [];
      this.taskWithAllSolution = data;
      console.log(this.taskWithAllSolution);
      const obj = {
        'ON_INSPECTION': 'На проверке',
        'NEED_TO_FINALIZE': 'Нужно доработать',
        'AGREED': 'Согласовано'
      };

      for (let i = 0; i < this.taskWithAllSolution.length; i++) {
        const task = this.taskWithAllSolution[i];
        const username = task.userDto.username;
        const fio = task.userDto.fio.split(' ');
        const fi = fio[0] + ' ' + fio[1];
        const group = task.userDto.groupNumber;
        if (task.solutionDto) {
          const idSol = task.solutionDto.id;
          // @ts-ignore
          const status = obj[task.solutionDto.status];
          const date1 = new Date(task.solutionDto.dateTime);
          const date2 = new Date(task.taskDto.deadLine);
          const date = date1.toLocaleString();
          const isOverdue = date1 > date2;
          let mark;
          if (task.solutionDto.mark) {
            if (task.solutionDto.mark !== 0) {
              if (task.solutionDto.mark === 6) {
                mark = 'Зачет';
              } else if (task.solutionDto.mark === 7) {
                mark = 'Незачет';
              } else {
                mark = task.solutionDto.mark.toString();
              }
            } else {
              mark = '-';
            }
          } else {
            mark = '-';
          }
          this.agreementDto.push(new AgreementDto(idSol, username, fi, group, status, date, mark, isOverdue));
        } else {
          this.agreementDto.push(new AgreementDto(0,username, fi, group, '-', '-', '-', false));
        }
      }
      this.dataSource = new MatTableDataSource(this.agreementDto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      sub.unsubscribe()
    })
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewSol(id: number) {
    console.log("sol " + id);
    this.agreementData = this.taskWithAllSolution.filter(task => task.solutionDto).filter(t => t.solutionDto.id === id)[0];
    const dialogRef = this.dialog.open(AgreementDialogComponent, {
      width: '50%',
      maxHeight: "650px",
      data: this.agreementData
    });
    dialogRef.afterClosed().subscribe(data => {
      this.getTaskWithAllSolution();
    })
  }

  viewProfile(fio: string) {
    console.log(fio);
    const dialogRef = this.dialog.open(ViewProfileDialogComponent, {
      width: '45%',
      panelClass: "myClass",
      maxHeight: "650px",
      data: fio
    });
  }
}
