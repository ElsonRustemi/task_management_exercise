import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  isLoggingIn: boolean = false;
  loginTest: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loginTest;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    // , Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    this.signUpForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.signUpForm?.controls;
  }

  // async signUp() {
  //   if (this.signUpForm?.valid) {
  //     const user = await this.auth.signUpUser({
  //       email: this.signUpForm.value.email,
  //       password: this.signUpForm.value.password
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  //     if(user) {
  //       this.router.navigate(['home']);
  //     } else {
  //       console.log("Please provide the correct information.");

  //     }
  //   }
  // }

  async signUp() {
    if (this.signUpForm?.valid) {
      try {
        const user = await this.auth.signUpUser({
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
          fullname: this.signUpForm.value.fullname // Assuming you have a 'bio' field in the form
        });

        this.router.navigate(['home']);
      } catch (error) {
        console.log("Please provide the correct information.");
      }
    }
  }

  login() {
    this.isLoggingIn = true;
    this.auth.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    // }).subscribe((data) => {
    }).then((data) => {
      console.log(data);

      this.isLoggingIn = false;
      this.router.navigate(['home']);
    }, (error: any) => {
      this.isLoggingIn = false;
    });
  }

}
