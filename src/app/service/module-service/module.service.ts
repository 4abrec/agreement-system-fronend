import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddModuleDto} from "../../model/addModuleDto";
import {Observable} from "rxjs";
import {Api} from "../../constant/api";
import {UpdateModuleDto} from "../../model/updateModuleDto";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) {
  }

  public saveModule(module: AddModuleDto): Observable<any> {
    return this.http.post(Api.MAIN_URL + '/api/module/save', module);
  }

  public updateModule(module: UpdateModuleDto): Observable<any> {
    return this.http.post(Api.MAIN_URL + '/api/module/update', module);
  }

  public getAllModules(): Observable<any> {
    return this.http.get(Api.MAIN_URL + '/api/module');
  }
}
