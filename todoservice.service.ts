import { Injectable } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth'
import { map } from 'rxjs/operators';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { MatDialog, MatDialogContainer} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../to-do/confirm-dialog/confirm-dialog.component'


@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  addtodo: AngularFireList<any>;
  items: AngularFireList<any>;
  
  documentToDomainObject = _ => {
    const object = _.payload;
    object.id = _.payload;
    return object;
  }

  isLoggedIn = false

  constructor(public db: AngularFireDatabase,
    public firebaseAuth: AngularFireAuth,
    public toastr:ToastrService,
    public router:Router,
    public dialog: MatDialog) { }


     addtodoitems =new FormGroup({
      $key: new FormControl(null),
      title: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ,]*')]),
      icon: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ,]*')]),
      startdate: new FormControl('',[Validators.required]),
      enddate: new FormControl('',[Validators.required]),
    })


    initializeFormGroup() {
      this.addtodoitems.setValue({
        $key: null,
        title: '',
        icon: '',
        startdate: '',
        enddate: '',
      });
    }

    //Getting To-do-item
    getItems() {
      this.addtodo = this.db.list('addtodo')
      return this.addtodo.snapshotChanges();
    }

    //Sign Up
   async signup(email:string, password: string){
       await this.firebaseAuth.createUserWithEmailAndPassword(email, password).
      then(res=>{
        this.isLoggedIn=true
        localStorage.setItem('user',JSON.stringify(res.user))
         this.router.navigate(['tododetails'])
       this.toastr.success("Welcome to To-Do App!")
      }).catch(err=>{
          this.toastr.error("Something Went Wrong:",err.message);
          this.router.navigate(['signup']);
      })
   }
    

// Data Add in collection on Sign Up
  sendData(data: any) {
    this.db.list('items').push(data);
  }

  //Login
  async Login(email: string, password: string) {
   await  this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      this.isLoggedIn=true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['tododetails'])
      this.toastr.success("Heyy, You Logged In Successfully!")
    }).catch(err=>{
        this.toastr.error("Something Went Wrong:",err.message);
        this.router.navigate(['login']);
    })

  }

  //Get to-do-item
 getItem() {
    return this.db.list('addtodo').snapshotChanges()
      .pipe(map(action => action
        .map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return data;
        })));
  }

  //Add to-do-item
  addData(data: any) {
        this.addtodo.push({
       title: data.title,
       icon: data.icon,
       startdate: data.startdate,
       enddate: data.enddate
  });
  }


  //Edit Button
  populateForm(data:any) {
    this.addtodoitems.setValue(data);
  }

  //Update To-do-Item
  updateItem(data:any) {
    this.addtodo.update(data.$key,{
      title: data.title,
      icon: data.icon,
      startdate: data.startdate,
      enddate: data.enddate
    });
    this.toastr.success("Item Updated successfully.")
  }

/*  openConfirmDialog(msg){
    return this.dialog.open(ConfirmDialogComponent),{
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "10px" },
       data :{
         message : msg
       }
     };
   }  */

// Delete To-do-Item
  deleteItems($key: string) {
    this.db.list('addtodo').remove($key);
 }

 
    Logout(){
      this.firebaseAuth.signOut();
      localStorage.removeItem('user')
      this.router.navigate(['login'])
    }
    
  }






