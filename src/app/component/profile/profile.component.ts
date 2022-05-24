import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {TaskService} from "../../service/task-service/task.service";
import {UserDto} from "../../model/userDto";
import {UserService} from "../../service/user-service/user.service";
import {UpdateAdminDto} from "../../model/updateAdminDto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BaseSnackbarComponent} from "../bar/base-snackbar/base-snackbar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  photoUrl: string;
  public username: string;
  public roles: string[] = this.tokenService.getAuthorities();
  public user: UserDto;

  constructor(private tokenService: TokenService, private taskService: TaskService,
              private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.username = <string>this.tokenService.getUsername();
    this.getPhoto();
    this.getUserByUsername();
  }

  getUserByUsername() {
    let sub = this.userService.getUserByUsername(this.username).subscribe(data => {
      this.user = data;

      console.log(this.user);
      sub.unsubscribe();

    })
  }

  getPhoto() {
    let sub = this.taskService.getPhoto(this.username).subscribe(data => {
      this.photoUrl = data.url;
      sub.unsubscribe()
    })
  }

  changePhoto(event: any) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload() {
    // @ts-ignore
    this.currentFile = this.selectedFiles.item(0);
    this.taskService.uploadPhoto(this.currentFile, this.username).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.getPhoto();
        }
      });
  }

  update() {
    // @ts-ignore
    document.getElementById('fio').readOnly = false;
    // @ts-ignore
    document.getElementById('fio').classList.remove('fio-info');
    // @ts-ignore
    document.getElementById('fio').classList.add('fio-update');
    // @ts-ignore
    document.getElementById('username').readOnly = false;
    // @ts-ignore
    document.getElementById('position').readOnly = false;
    // @ts-ignore
    document.getElementById('address').readOnly = false;
    // @ts-ignore
    document.getElementById('university').readOnly = false;
    // @ts-ignore
    document.getElementById('phone_number').readOnly = false;
  }

  saveChanges() {
    // @ts-ignore
    document.getElementById('fio').readOnly = true;
    // @ts-ignore
    document.getElementById('fio').classList.remove('fio-update');
    // @ts-ignore
    document.getElementById('fio').classList.add('fio-info');
    // @ts-ignore
    document.getElementById('username').readOnly = true;
    // @ts-ignore
    document.getElementById('position').readOnly = true;
    // @ts-ignore
    document.getElementById('address').readOnly = true;
    // @ts-ignore
    document.getElementById('university').readOnly = true;
    // @ts-ignore
    document.getElementById('phone_number').readOnly = true;


    this.userService.updateAdmin(new UpdateAdminDto(this.user.username, this.user.fio, this.user.position,
      this.user.address, this.user.university, this.user.phoneNumber)).subscribe(data => {
      this.snackBar.openFromComponent(BaseSnackbarComponent, {
        duration: 2000,
        data: data.message,
      });
      this.getUserByUsername();
    })
  }
}
