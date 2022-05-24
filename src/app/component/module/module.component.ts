import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {MatDialog} from "@angular/material/dialog";
import {RegistrationDialogComponent} from "../dialog/registration-dialog/registration-dialog.component";
import {AddModuleDialogComponent} from "../dialog/add-module-dialog/add-module-dialog.component";
import {ViewModuleDto} from "../../model/viewModuleDto";
import {ModuleService} from "../../service/module-service/module.service";
import {UpdateDialogComponent} from "../dialog/update-dialog/update-dialog.component";
import {EditModuleDialogComponent} from "../dialog/edit-module-dialog/edit-module-dialog.component";
import {ViewProfileDialogComponent} from "../view-profile-dialog/view-profile-dialog.component";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.less']
})
export class ModuleComponent implements OnInit {

  public roles: string[];
  public perf: string[] = [];
  public review: string[] = [];

  public modules: ViewModuleDto[] = []

  constructor(private tokenService: TokenService, public dialog: MatDialog, private moduleService: ModuleService) {
  }

  getAllModules() {
    let sub = this.moduleService.getAllModules().subscribe(data => {
      this.review = [];
      this.perf = [];
      this.modules = data;
      this.modules.forEach((el: ViewModuleDto) => {
        el.performers.forEach(e => {
          if (!this.perf.includes(e.fio)) {
            this.perf.push(e.fio);
          }
        });
        el.reviewers.forEach(e => {
          if (!this.review.includes(e.fio)) {
            this.review.push(e.fio);
          }
        });
      })
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.getAllModules();
  }

  edit(index: number) {
    const module = this.modules[index];
    const dialogRef = this.dialog.open(EditModuleDialogComponent,
      {
        width: '45%',
        maxHeight: "650px",
        data: module
      });
    let sub = dialogRef.afterClosed().subscribe(data => {
      this.getAllModules();
    });


  }

  openDialog() {
    const dialogRef = this.dialog.open(AddModuleDialogComponent, {
      width: '20%',
      panelClass: "myClass",
      maxHeight: "650px"
    });
    let sub = dialogRef.afterClosed().subscribe(data => {
      this.getAllModules();
    });
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
