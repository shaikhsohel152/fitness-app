import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome4',
  templateUrl: './welcome4.component.html',
  styleUrls: ['./welcome4.component.css']
})
export class Welcome4Component implements OnInit {

  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const requestData = localStorage.getItem('RequestRaised');
    if (requestData) {
      const req = JSON.parse(requestData);
      this.userName = req.name;
    }
  }

  closePage(): void {
    this.router.navigate(['/contact']);
  }
}
