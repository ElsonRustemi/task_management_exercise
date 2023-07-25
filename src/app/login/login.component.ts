import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggingIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    this.isLoggingIn = true;
    this.auth.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe((data) => {
      console.log(data);

      this.isLoggingIn = false;
      this.router.navigate(['home']);
    }, (error: any) => {
      this.isLoggingIn = false;
    });
  }

}
