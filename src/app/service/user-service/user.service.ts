import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../model/userDto";
import {Api} from "../../constant/api";
import {UpdateStudentDto} from "../../model/updateStudentDto";
import {UpdateAdminDto} from "../../model/updateAdminDto";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addChat(senderUsername: string, recipientUsername: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("senderUsername", senderUsername);
    queryParams = queryParams.append("recipientUsername", recipientUsername);
    return this.http.get(Api.MAIN_URL + '/api/user/add/chat', {params: queryParams});
  }

  public getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/all');
  }

  public getAllStudents(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/student');
  }

  public getAllAdmins(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/admin');
  }

  public getAllUserChat(username: string): Observable<UserDto[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    return this.http.get<UserDto[]>(Api.MAIN_URL + '/api/user/chat', {params: queryParams});
  }

  public sendMessage(senderUsername: string, recipientUsername: string, message: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("senderUsername", senderUsername);
    queryParams = queryParams.append("recipientUsername", recipientUsername);
    queryParams = queryParams.append("text", message);
    return this.http.get(Api.MAIN_URL + '/api/message/send', {params: queryParams});
  }

  public getAllMessages(senderUsername: string, recipientUsername: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("senderUsername", senderUsername);
    queryParams = queryParams.append("recipientUsername", recipientUsername);
    return this.http.get(Api.MAIN_URL + '/api/message', {params: queryParams});
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

  public getUserByUsername(username: string): Observable<UserDto> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    return this.http.get<UserDto>(Api.MAIN_URL + '/api/user', { params: queryParams});
  }

  public updateAdmin(admin: UpdateAdminDto): Observable<any> {
    return this.http.post<any>(Api.MAIN_URL + '/api/user/admin/update', admin, httpOptions);
  }
}
