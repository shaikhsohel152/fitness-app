import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

orders:any[]=[];

constructor(private router:Router){}

ngOnInit(){

this.loadOrders();

}


/* LOAD ORDERS FROM LOCALSTORAGE */

loadOrders(){

const data = localStorage.getItem("orders");

if(data){

this.orders = JSON.parse(data);

}else{

this.orders = [];

}

}



/* BACK TO PROFILE */

goBack(){

this.router.navigate(['/porfolio']);

}

}