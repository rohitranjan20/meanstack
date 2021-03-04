import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

  serverUrl = 'http://localhost:3000/api/';
  errorData = {};
  // redirectUrl: String;

  isLoggedIn() {
    var token = localStorage.getItem('token');
    if (token) return true;
    else return false;
  }

  logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('adminData');
      this.router.navigate(['/']);
      return true;
  }

  getData(url: any) {
      const URL = this.serverUrl + url
      return this.http.get(URL)
  }

  postData(url: any, data: any) {
    const URL = this.serverUrl + url;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(URL, data)
  }

  getVerifyData() {
    const URL = this.serverUrl + 'tokenverify';
    const token = localStorage.getItem('token');
    const header = new HttpHeaders({ 'Authorization': `${token}` });
    const options = {
       headers: header
    };
    return this.http.get(URL, options)
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong,

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
