import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  items: any;
  itemClicked!: any;


  constructor(private router: Router) {
    this.items = [
      {
        title: 'User',
        subtitle: 'User Component',
        description: 'Create and manage users.',
      },
      {
        title: 'Task Admin',
        subtitle: 'Task Admin Component',
        description: 'Create and manage tasks.',
      },
      {
        title: 'About',
        subtitle: 'About Component',
        description: 'Description about the purpose of the application.',
      },
      {
        title: 'Logout',
        subtitle: 'Logout Component',
        description: 'Logout from application.',
      }
    ]
  }


  navigateComponent() {
    if (this.itemClicked?.title === 'User') {
      this.router.navigateByUrl('/home/users');
    } else if (this.itemClicked?.title === 'Task Admin') {
      this.router.navigateByUrl('/home/tasks');
    } else if (this.itemClicked?.title === 'About') {
      this.router.navigateByUrl('/home/about');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
