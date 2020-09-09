import { Component, OnInit } from '@angular/core';
import {TodoserviceService} from '../todoservice.service'
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {
  alert: boolean=false
  itemData=[];
  submitted: boolean
  isLoggedIn= false
  constructor(public todoservice:TodoserviceService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
     if(localStorage.getItem('user')!==null)
       this.isLoggedIn= true
     else  
        this.isLoggedIn= false

  }
  
  fromControls= this.todoservice.addtodoitems.controls; 


  //Sign up
  add(){
     // this.todoservice.addData(this.todoservice.addtodoitems.value);
      this.submitted = true;
      if (this.todoservice.addtodoitems.valid) {
        if (this.todoservice.addtodoitems.get('$key').value == null){
          this.todoservice.addData(this.todoservice.addtodoitems.value);
          this.toastr.success("Item added succesfully !")
          this.todoservice.addtodoitems.reset();
       }else
          this.todoservice.updateItem(this.todoservice.addtodoitems.value);
          
          this.submitted = false;
          this.todoservice.addtodoitems.reset();
          this.todoservice.addtodoitems.setValue({
            $key: null,
            title: '',
            icon: '',
            startdate: '',
            enddate: ''
        });
      }
       }
    
    
      }

  


