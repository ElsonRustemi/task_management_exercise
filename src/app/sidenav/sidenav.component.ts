import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  href!: string;

  constructor (private router: Router) {
    this.href = this.router.url;
    console.log(this.href);
  }

  ngOnInit(): void {


  }

}
