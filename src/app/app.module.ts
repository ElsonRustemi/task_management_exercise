import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';



import { AppComponent } from './app.component';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PaginationComponent } from './admin-tasklist/pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';
import { UsersComponent } from './users/users.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,
    AdminTasklistComponent,
    AdminHeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    PaginationComponent,
    LoginComponent,
    CardComponent,
    UsersComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AppRoutingModule,


    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAr4xITd6YX0ne5yyklnrZpSd_uCgHUMHA",
      authDomain: "task-management-ab934.firebaseapp.com",
      projectId: "task-management-ab934",
      storageBucket: "task-management-ab934.appspot.com",
      messagingSenderId: "34327655070",
      appId: "1:34327655070:web:572877300f34afc78e818f"
    }),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
