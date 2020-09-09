import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { Observable, observable, from } from 'rxjs';
import { TodoserviceService} from '../todoservice.service';
import {CommonModule} from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted: boolean;
  isLoggedIn: boolean=false
  
  constructor(private todoservice: TodoserviceService,
    private toastr: ToastrService,
    public firebaseAuth: AngularFireAuth) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null)
        this.isLoggedIn = true
      else
        this.isLoggedIn = false
    
  }
  
  signupform= new FormGroup({
    
    first: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    last: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
    gender: new FormControl('',Validators.required),
  })


  get first() {
     return this.signupform.get('first');
  }
  get last() {
    return this.signupform.get('last');
 }
 get email() {
  return this.signupform.get('email');
}
get password() {
  return this.signupform.get('password');
}
get gender() {
  return this.signupform.get('gender');
}

   async signup(){
    
    if (this.signupform.valid) {
        const {email,password}= this.signupform.value
        this.todoservice.signup(email, password)
        this.todoservice.sendData(this.signupform.value);
        this.toastr.success("Sign Up Success!")
       
        this.signupform.reset();
    }
  } 
  
  

}
