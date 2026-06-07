import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myfolder';

constructor() {
    console.log('APP STARTED');
    localStorage.removeItem('currentUser');
  }
}
