import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Api} from "../../constant/api";
import {TaskWithSolutionDto} from "../../model/TaskWithSolutionDto";
import {TaskWithAllSolutionDto} from "../../model/taskWithAllSolutionDto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  public getTasksWithSolution(moduleId: number): Observable<any> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("moduleId",moduleId);

    return this.http.get(Api.MAIN_URL + '/api/task', {params: queryParams});

  }

  public getTaskWithSolutionById(taskId: number): Observable<TaskWithSolutionDto> {
    return this.http.get<TaskWithSolutionDto>(Api.MAIN_URL + '/api/task/' + taskId);
  }

  public upload(file: File, taskId: number, username: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("taskId",taskId);
    queryParams = queryParams.append("username", username);
    const req = new HttpRequest('POST', Api.MAIN_URL + '/api/solution/upload', formData, {
      reportProgress: true,
      params: queryParams,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public uploadPhoto(file: File, username: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    const req = new HttpRequest('POST', Api.MAIN_URL + '/images/upload', formData, {
      reportProgress: true,
      params: queryParams,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public getPhoto(username: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    return this.http.get(Api.MAIN_URL + '/images', {params: queryParams});
  }

  getFiles(taskId: number, username: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("taskId",taskId);
    queryParams = queryParams.append("username", username);
    return this.http.get(Api.MAIN_URL + '/files', {params: queryParams});
  }

  deleteFile(id: string): Observable<any> {
    return this.http.delete(Api.MAIN_URL + '/files/' + id);
  }

  save(taskId: number, text: string, username: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("taskId",taskId);
    queryParams = queryParams.append("username", username);
    queryParams = queryParams.append("text", text);
    return this.http.get(Api.MAIN_URL + '/api/solution/save', {params: queryParams});
  }

  update(taskId: number, solutionId : number, text: string, username: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("taskId",taskId);
    queryParams = queryParams.append("solutionId", solutionId);
    queryParams = queryParams.append("username", username);
    queryParams = queryParams.append("text", text);
    return this.http.get(Api.MAIN_URL + '/api/solution/update', {params: queryParams});
  }

  getTaskWithAllSolutions(taskId: number): Observable<TaskWithAllSolutionDto[]> {
    return this.http.get<TaskWithAllSolutionDto[]>(Api.MAIN_URL + '/api/task/students/' + taskId);
  }

  agreementSolution(solId: number, mark: string, comment: string, isAgree: boolean): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("solId", solId);
    queryParams = queryParams.append("mark", mark);
    queryParams = queryParams.append("comment", comment);
    queryParams = queryParams.append("isAgree", isAgree);
    return this.http.get(Api.MAIN_URL + '/api/solution/agreement', {params: queryParams});
  }

}
