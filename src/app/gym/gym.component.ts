import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

import { Router } from '@angular/router';

interface Members {
  fullName: string;
  email: string;
  phone: string;
  training: string;
}

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})

export class GymComponent implements OnInit {

  joinForm!: FormGroup;

   features = [
    {
      title: 'Strength Training',
      desc: 'Build muscle with advanced equipment.',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e'
    },
    {
      title: 'Cardio Zone',
      desc: 'High energy cardio workouts.',
      image: 'assets/cardio2.jpg'
    },
    {
      title: 'Yoga Classes',
      desc: 'Improve flexibility and peace.',
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3'
    },
    {
      title: 'Personal Training',
      desc: 'One-on-one coaching.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    
    private route: Router
  ) {}

  ngOnInit(): void {

    this.joinForm = this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [Validators.required, Validators.email]
      ],

      phone: [
        '',
        Validators.required
      ],

      training: [
        '',
        Validators.required
      ]

    });

  }

  OnJoingym(): void {

    const user = localStorage.getItem('currentUser');

  if (!user) {
    
    this.route.navigate(['/without-login'], {
    queryParams: { returnUrl: '/gym' } });
    return;
  }


    if (this.joinForm.invalid) {
      return;
    }

    const members: Members = this.joinForm.value;

    this.api.addMembers(members).subscribe({

      next: (res:any) => {

        localStorage.setItem(
          'Members',
          JSON.stringify(res)
        );

        

        this.joinForm.reset();

        this.route.navigate(['/welcome']);

      },

      error: () => {

        alert(
          'Something went wrong',
          
        );

      }

    });

  }

}