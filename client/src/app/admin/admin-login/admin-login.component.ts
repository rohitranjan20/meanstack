import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
export class Log{
  email: any;
  password: any;
  constructor() {}
}
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  log: any;
  verify:any;
  loginForm:any;

  

  constructor(public api: AdminService,
    private router:Router,
    ) { 
    this.log = new Log();
  }

  login() {
    // this.log.email = 'rohit.ranjan@sitanet.in'
    // this.log.password = '12345'
    this.api.postData('login', this.log).subscribe( (res:any) => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/admin/dashboard']);
    }, err => {
      console.log(err)
    })
  }


  ngOnInit(): void {
    let token;
   token =  localStorage.getItem('token')
   console.log(token)
   if(!token){
    this.router.navigate(['/admin/login']);
   } else{
    this.api.getVerifyData().subscribe((res:any) => {
      this.router.navigate(['/admin/dashboard']);
      console.log(res)
    }, err => {
      console.log(err)
    })
   }

  }

}
