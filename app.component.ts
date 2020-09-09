import { Component, EventEmitter,Output, OnInit } from '@angular/core';
import { TodoserviceService } from './to-do/todoservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-Do-Project';
  @Output() isLogout= new EventEmitter<void>()

  

  constructor(public todoservice:TodoserviceService){

  }

 

  logout(){
     this.todoservice.Logout();
     this.isLogout.emit()
  }
}
