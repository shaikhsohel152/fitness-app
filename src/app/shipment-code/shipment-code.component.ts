import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipment-code',
  templateUrl: './shipment-code.component.html',
  styleUrls: ['./shipment-code.component.css']
})
export class ShipmentCodeComponent implements OnInit {

  returnUrl: string = '/portfolio';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });

  }

  goBack() {

    console.log("Navigating to:", this.returnUrl);

    this.router.navigateByUrl(this.returnUrl);

  }

}