import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';

@Injectable()
export class AuthenticationService {

    constructor (
        private http: HttpClient
        // private http: Http
    ) {

    }

    login (userName: string, password: string) {
        return this.http.post<any>('/api/authenticate', { userName: userName, password: password  })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    register (userData: any) {
        return this.http.post<any>('/api/register', userData)
    }
    // register (userData: any) {
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     const options = new RequestOptions({ headers: headers });
    //     return this.http.post(`/api/register/`, JSON.stringify(userData), options)
    //       .timeout(this.timeout)
    //       .map((response: Response) => response.json());
    //   }

    

}
