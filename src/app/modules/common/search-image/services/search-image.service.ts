import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/baseResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchImageService {
  constructor(
    private http: HttpClient
) {}
getAll( keyword:string):Observable<BaseResponse<string[]>> {
    return this.http.get<BaseResponse< string[]>>(`${environment.apiUrl}/StudySet/GetImageKeyWord?keyword=${keyword}`);
}
}
