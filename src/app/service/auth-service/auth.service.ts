import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Api} from "../../constant/api";
import {LoginDto} from "../../model/loginDto";
import {RegistrationStudentDto} from "../../model/registrationStudentDto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<any>(Api.LOGIN_URL, loginDto, httpOptions);
  }

  signup(registrationDto: RegistrationStudentDto) : Observable<any> {
    return this.http.post<any>(Api.MAIN_URL + '/api/auth/signup', registrationDto, httpOptions);
  }
}
