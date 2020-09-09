import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

import { AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth'

import { SignupComponent } from './to-do/signup/signup.component';
import {LoginComponent} from './to-do/login/login.component';
import { AddtodoComponent } from './to-do/addtodo/addtodo.component';
import {TodoserviceService} from './to-do/todoservice.service' 
import {ToDoDetailsComponent} from './to-do/to-do-details/to-do-details.component'
import {ConfirmDialogComponent} from './to-do/confirm-dialog/confirm-dialog.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AddtodoComponent,
    ToDoDetailsComponent,
    ConfirmDialogComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastContainerModule,
    ToastrModule.forRoot({
    timeOut: 5000,
    positionClass: 'toast-center-center',
    preventDuplicates: true
}),
AngularFireAuthModule
  ],
  providers: [TodoserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
