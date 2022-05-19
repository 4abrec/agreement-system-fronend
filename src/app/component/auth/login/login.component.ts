import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../service/token.service";
import {CONSTANTS} from "../../../constant/util";
import {LoginDto} from "../../../model/loginDto";
import {AuthService} from "../../../service/auth-service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {BaseSnackbarComponent} from "../../bar/base-snackbar/base-snackbar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public message: string;
  public loginUser: LoginDto;

  _loginForm: FormGroup = new FormGroup({
    "username": new FormControl("",
      [Validators.required/*,
        Validators.email*/]),
    "password": new FormControl("",
      [Validators.required]),
  });

  constructor(private tokenService: TokenService, private authService: AuthService, public snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    console.log(event);
    if (!this._loginForm.invalid) {
      this.loginUser = new LoginDto(
        this._loginForm.value['username'],
        this._loginForm.value['password'],
      )
      let subscription = this.authService.login(this.loginUser).subscribe(res => {
          this.tokenService.saveAuthorities(res.role);
          this.tokenService.saveToken(res.token);
          this.tokenService.saveUsername(res.username);
          this.tokenService.saveTokenType(res.type);
          subscription.unsubscribe();
          if (res.role.includes('ROLE_ADMIN')) {
            this.router.navigate(['students']);
          }
          else {
            this.router.navigate(['tasks'])
          }
        },
        error => {
          if (error.status === 400 || error.status === 401) {
            this.snackBar.openFromComponent(BaseSnackbarComponent, {
              duration: 2000,
              data: 'Проверьте введенные данные',
            });
          } else {
            console.log(error.status)
            this.snackBar.openFromComponent(BaseSnackbarComponent, {
              duration: 2000,
              data: 'Отсутствует соединение с сервером',
            });
          }});
    }
  }
}
