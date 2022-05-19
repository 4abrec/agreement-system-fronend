import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../service/user-service/user.service";
import {UserDto} from "../../model/userDto";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {RegistrationDialogComponent} from "../dialog/registration-dialog/registration-dialog.component";
import {UpdateDialogComponent} from "../dialog/update-dialog/update-dialog.component";
import {BaseSnackbarComponent} from "../bar/base-snackbar/base-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['username', 'fio', 'university', 'groupNumber', 'phoneNumber', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public students: UserDto[];

  constructor(private userService: UserService, public dialog: MatDialog, public snackBar: MatSnackBar) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '30%'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllStudents();
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent,
      {
        width:'30%',
        data: row
      });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllStudents();
    });
  }

  delete(username: string) {
    let subscription = this.userService.deleteStudent(username).subscribe(data => {
        this.snackBar.openFromComponent(BaseSnackbarComponent, {
          duration: 2000,
          data: data.message,
        });
        subscription.unsubscribe();
        this.getAllStudents();
      },
      error => {
        if (error.status === 400 || error.status === 401) {
          this.snackBar.openFromComponent(BaseSnackbarComponent, {
            duration: 2000,
            data: error.error.message,
          });
        } else {
          console.log(error.status)
          this.snackBar.openFromComponent(BaseSnackbarComponent, {
            duration: 2000,
            data: 'Отсутствует соединение с сервером',
          });
        }});
  }

  getAllStudents() {
    this.userService.getAllStudents().subscribe(data => {
      this.students = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
