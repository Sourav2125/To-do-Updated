import { Component, OnInit, ViewChild,OnChanges } from '@angular/core';
import { TodoserviceService } from '../todoservice.service'
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'


import { MatDialog, MatDialogConfig ,MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'


import { AddtodoComponent } from '../addtodo/addtodo.component';


@Component({
  selector: 'app-to-do-details',
  templateUrl: './to-do-details.component.html',
  styleUrls: ['./to-do-details.component.css']
})

export class ToDoDetailsComponent implements OnInit {
  
 loginmsg;
  itemData = [];
  isLoggedIn :boolean= false
  constructor(public todoservice: TodoserviceService,
    public toastr: ToastrService,
    private dialog: MatDialog,
    public router: Router) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'icon', 'startdate', 'enddate','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string

  ngOnInit(): void {
     if(localStorage.getItem('user')!==null)
        this.isLoggedIn = true
      else
        this.isLoggedIn = false

    this.todoservice.getItems().subscribe(
      list => {
        this.itemData = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
           };
        });
      });    

    this.listData = new MatTableDataSource(this.itemData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    

    this.listData.filterPredicate=(itemData,filter)=>{
      return this.displayedColumns.some(item=>{
        return item != 'actions' && itemData[item].toLowerCase().indexOf(filter) != -1;
      });
    };
    
  }

    

 // todayNumber: number = Date.now();
 // todayDate : Date = new Date();
  //todayString : string = new Date().toDateString();
 // todayISOString : string = new Date().toISOString();


 //Add To-Do
  additem() {
    this.todoservice.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddtodoComponent, dialogConfig);
   
  }

  //Edit
  onEdit(row) {
    this.todoservice.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddtodoComponent, dialogConfig);
    
  }

  /* Search Field */
  onSearchClear() {
    this.searchKey = "";
    
  }

 /* applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }  */


  //Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }


  /*
  view() {
    this.todoservice.getItem().subscribe((data => {
      console.log(data)
      this.itemData = data

    }))
  }
*/


//Delete
  delete($key) {
  //  this.todoservice.openConfirmDialog('Are you sure to delete this record ?')
   
    if (confirm('Are you sure to delete this record ?')) {
      this.todoservice.deleteItems($key);

    }
  }


  //Logout
  logout(){
    this.todoservice.Logout();
  }

}
