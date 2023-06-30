import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home/tasks', component: AdminTasklistComponent},
  {path: 'home/about', component: AboutComponent},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
