import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseResponse } from '../models/baseResponse';
import { Token } from '../models/token'; 
import { StudySet } from '../models/studySet';

@Injectable({ providedIn: 'root' })
export class StudySetService {

    constructor(
        private http: HttpClient,
        public jwtHelper : JwtHelperService
    ) {}
    getAll( keyword:string):Observable<BaseResponse<string[]>> {
        return this.http.get<BaseResponse< string[]>>(`${environment.apiUrl}/StudySet/GetImageKeyWord?keyword=${keyword}`);
    }
    createStudySet(studySet:any):Observable<BaseResponse<StudySet>>{
        const httpHeader = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json' });
        let options = { headers: headers };
        return this.http.post<BaseResponse<StudySet>>(`${environment.apiUrl}/Studyset/CreateStudySet`, studySet, options);
    }
}