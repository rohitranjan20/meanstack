import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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
}
