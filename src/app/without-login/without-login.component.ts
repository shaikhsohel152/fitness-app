import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-without-login',
  templateUrl: './without-login.component.html',
  styleUrls: ['./without-login.component.css']
})
export class WithoutLoginComponent {

  returnUrl: string = '/';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });

  }

  close(): void {

    this.router.navigate([this.returnUrl]);

  }

}