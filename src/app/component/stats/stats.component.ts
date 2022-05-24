import {Component, OnInit, ViewChild} from '@angular/core';
import {ViewModuleDto} from "../../model/viewModuleDto";
import {ModuleService} from "../../service/module-service/module.service";
import {TokenService} from "../../service/token.service";
import {TaskWithSolutionDto} from "../../model/TaskWithSolutionDto";
import {TaskService} from "../../service/task-service/task.service";
import {AgreementDto} from "../../model/agreementDto";
import {MatTableDataSource} from "@angular/material/table";
import {StatsDto} from "../../model/ statsDto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.less']
})
export class StatsComponent implements OnInit {


  displayedColumns: string[] = ['title', 'status', 'sendDate', 'deadLine', 'mark'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public modules: ViewModuleDto[] = [];
  public module: ViewModuleDto;
  public username: string;
  public selectedModule: number;
  public taskWithAllSolution: TaskWithSolutionDto[];
  public statsDto: StatsDto[] = [];

  constructor(private moduleService: ModuleService, private tokenService: TokenService,
              private taskService: TaskService) { }

  ngOnInit(): void {

    this.username = <string>this.tokenService.getUsername();
    console.log(this.username);
    this.moduleService.getAllModules().subscribe(data => {
      this.modules = data;
    })
  }

  selectModule(event: any) {
    let sub = this.taskService.getTasksWithSolution(event.value).subscribe(data => {
      this.taskWithAllSolution = data;
      this.module = this.modules.filter(el => el.id === event.value)[0];

      const obj = {
        'ON_INSPECTION': 'На проверке',
        'NEED_TO_FINALIZE': 'Нужно доработать',
        'AGREED': 'Согласовано'
      };

      for (let i = 0; i < this.taskWithAllSolution.length; i++) {
        const task = this.taskWithAllSolution[i];
        const title = task.taskDto.title;
        if (task.solutionDto) {
          // @ts-ignore
          const status = obj[task.solutionDto.status];
          const date1 = new Date(task.solutionDto.dateTime);
          const date2 = new Date(task.taskDto.deadLine);
          const sendDate = date1.toLocaleString();
          const deadLine = date2.toLocaleString();
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
          this.statsDto.push(new StatsDto(title, status, sendDate, deadLine, mark, isOverdue));
        } else {
          this.statsDto.push(new StatsDto(title, '-', '-', new Date(task.taskDto.deadLine).toLocaleString(), '-', false));
        }
      }
      this.dataSource = new MatTableDataSource(this.statsDto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      sub.unsubscribe()
    });
    console.log("select: " + this.selectedModule);
    console.log(this.modules);
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
