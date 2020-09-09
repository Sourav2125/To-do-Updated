import { Component, OnInit } from '@angular/core';
import {TodoserviceService} from '../todoservice.service'
import {FormControl, FormGroup, Validator, Validators, PatternValidator} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
showData=[];
public isLoggedIn= false
  constructor(private todoservice:TodoserviceService,
    private toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
      if(localStorage.getItem('user')!== null)
         this.isLoggedIn=true
       else
          this.isLoggedIn=false  
  }

  //Login Form Group
  loginform=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  get email(){
    return this.loginform.get('email');
  }
  get password(){
    return this.loginform.get('password');
  }
  
  
  //Login
  async login(){
    const {email, password}= this.loginform.value
    await  this.todoservice.Login( email , password)
        if(this.todoservice.isLoggedIn)
           this.isLoggedIn=true

     }


}
