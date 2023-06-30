import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PaginationComponent } from './admin-tasklist/pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';

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
    CardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
