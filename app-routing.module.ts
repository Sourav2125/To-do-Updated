import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './to-do/login/login.component';
import {AddtodoComponent} from './to-do/addtodo/addtodo.component'
import {ToDoDetailsComponent} from './to-do/to-do-details/to-do-details.component'
import {SignupComponent} from './to-do/signup/signup.component'
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './to-do/confirm-dialog/confirm-dialog.component'
import {AppComponent} from './app.component'
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component'


const routes: Routes = [
  {
       path : '',
       component: SignupComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addtodo',
    component: AddtodoComponent
  },
   {
     path: 'tododetails',
    component: ToDoDetailsComponent
   },
   {
     path: 'confirmdialog',
     component: ConfirmDialogComponent
   },
   {
     path: '**',
     component: PagenotfoundComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
