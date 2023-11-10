import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseResponse } from '../models/baseResponse';
import { Token } from '../models/token'; 


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    token:Token | undefined;
    constructor(
        private router: Router,
        private http: HttpClient,
        public jwtHelper : JwtHelperService
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if(token){
         
        //check wherether the token is expired and return
        // true or false
        //return !this.jwtHelper.isTokenExpired(token);
            return true;
        }
        return false;
       }
       public resetToken() {
        localStorage.setItem('token','');
       }
    login(username?: string, password?: string):Observable<BaseResponse<Token>> {
        let userLogin = {username: username, password: password};
        return this.http.post<BaseResponse<Token>>(`${environment.apiUrl}/User/Login`, userLogin)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.status === 200)
                {
                    console.log("login ok")
                    this.token = user.data;
                    localStorage.setItem('token', user.data.token);
                    localStorage.setItem('userName', username);
                }
              //  this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.router.navigate(['/home']);
    }

    register(user: any):Observable<BaseResponse<Token>>{
        return this.http.post<BaseResponse<Token>>(`${environment.apiUrl}/User/CreateUser`, user)
            .pipe(map(user => {
                    if(user.status === 200)
                    {
                        console.log("register ok")
                        this.token = user.data;
                        localStorage.setItem('token', user.data.token);
                        localStorage.setItem('username', user.data.userName);
                    }
                    return user;
            }));
       
        
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}