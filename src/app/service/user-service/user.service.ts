import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../model/userDto";
import {Api} from "../../constant/api";
import {UpdateStudentDto} from "../../model/updateStudentDto";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/student');
  }

  public getAllAdmins(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/admin');
  }

  public updateStudent(student: UpdateStudentDto): Observable<any>{
    return this.http.post<any>(Api.MAIN_URL + '/api/user/student/update', student, httpOptions);
  }

  public deleteStudent(username: string): Observable<any> {
    return this.http.delete(Api.MAIN_URL + '/api/user/delete/' + username);
  }

  public getStudentsByModule(moduleId: number): Observable<UserDto[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("moduleId", moduleId);
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/module', {params: queryParams});
  }
}
