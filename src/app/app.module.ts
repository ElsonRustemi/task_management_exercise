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
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.prod';
import { SignUpComponent } from './sign-up/sign-up.component';


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
    UsersComponent,
    SignUpComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AppRoutingModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
