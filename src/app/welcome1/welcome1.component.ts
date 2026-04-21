import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome1',
  templateUrl: './welcome1.component.html',
  styleUrls: ['./welcome1.component.css']
})
export class Welcome1Component implements OnInit {

  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
   
    this.userName = history.state?.name || '';
  }

  closePage(): void {
    
    this.router.navigate(['/porfolio']);
  }
}
