import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  href!: string;

  constructor(private router: Router) { 
    this.href = this.router.url;
    console.log(this.href);
    
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
